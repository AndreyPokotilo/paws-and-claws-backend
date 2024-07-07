const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const { User } = require("../models/user");
const { HttpError } = require("../helpers");
const tokenServise = require("./tokenServise");
const emailServise = require("./emailServise");
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;
const { ctrlErrorHandler } = require("../helpers");

class UserServise {
  async register(name, email, password) {
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email already in use");
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const verificationCode = nanoid();

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      verificationCode,
    });

    const payload = {
      id: newUser._id,
    };

    const tokens = await tokenServise.generateTokens(payload);

    const { accessToken, refreshToken } = tokens;

    await tokenServise.saveToken(newUser, tokens);

    await emailServise.sendActivateEmail(newUser);

    return { accessToken, refreshToken };
  }

  async authGoogle(id) {
    const payload = { id };
    const tokens = await tokenServise.generateTokens(payload);
    const { accessToken, refreshToken } = tokens;

    await User.findByIdAndUpdate(id,{ accessToken, refreshToken });
    return { accessToken, refreshToken };
  }

  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(400, "User is not defined");
    }

    if (!user.verify) {
      throw HttpError(401, "Email is not verified");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };

    const tokens = await tokenServise.generateTokens(payload);

    const { accessToken, refreshToken } = tokens;

    await tokenServise.saveToken(user, tokens);

    const { name } = user;

    return { name, email, accessToken, refreshToken };
  }

  async logout(user) {
    user.accessToken = "";
    user.refreshToken = "";

    await user.save();

    return;
  }

  async refresh(token) {
    const id = await tokenServise.verifyRefreshToken(token);

    const user = await User.findOne({ refreshToken: token });

    if (!user || !id) {
      throw HttpError(403, "Token is invalid");
    };

    const payload = {id};

    const tokens = await tokenServise.generateTokens(payload);

    await tokenServise.saveToken(user, tokens);

    return tokens;
  }

  async verifyEmail(verificationCode) {
    const user = await User.findOne({ verificationCode });

    if (!user) {
      throw HttpError(401, "Email not found");
    }

    if (user.verify) {
      throw HttpError(400, "User is verified");
    }

    user.verify = true;
    user.verificationCode = "";

    await user.save();
  }

  async resendVerifyEmail(email) {
    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(401, "Email not found");
    }

    if (user.verify) {
      throw HttpError(401, "Email already verify");
    }

    await emailServise.sendActivateEmail(user);
  }

  async resetPassword(email) {
    const user = await User.findOne({ email });

    const { name } = user;

    if (!user) {
      throw HttpError(400, "User not found");
    }

    const payload = {
      id: user._id,
    };

    const resetPasswordToken = await tokenServise.generateResetToken(payload);

    user.resetPasswordToken = resetPasswordToken;

    await emailServise.sendEmail({ email, resetPasswordToken, name });

    await user.save();
  }

  async verifyResetToken(resetPasswordToken) {
    const user = await User.findOne({ resetPasswordToken });

    if (!user) {
      throw HttpError(400, "User not found");
    }

    const isVerify = await tokenServise.verifyResetToken(resetPasswordToken);

    if (!isVerify) {
      throw HttpError(401, "Token is not valid");
    }
  }

  async updatePassword(password, resetPasswordToken) {
    const id = await tokenServise.verifyResetToken(resetPasswordToken);

    if (!id) {
      throw HttpError(400);
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const result = await User.findByIdAndUpdate(id, {
      password: hashPassword,
      resetPasswordToken: "",
    });

    if (!result) {
      throw HttpError("Bad request");
    }
  }
}

module.exports = new UserServise();
