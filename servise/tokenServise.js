const jwt = require("jsonwebtoken");
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY, RESET_PASSWORD_KEY } = process.env;

class TokenServise {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "20s" });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "7d" });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(user, tokens) {
    console.log(tokens);
    if (user || tokens) {
      const { accessToken, refreshToken } = tokens;

      user.accessToken = accessToken;
      user.refreshToken = refreshToken;

      await user.save();
    }
  }

  async verifyRefreshToken(token) {
    try {
      const { id } = jwt.verify(token, REFRESH_SECRET_KEY);

      return id;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async generateResetToken(payload) {
    return jwt.sign(payload, RESET_PASSWORD_KEY, { expiresIn: "1h" });
  }

  async verifyResetToken(token) {
    try {
      const { id } = jwt.verify(token, RESET_PASSWORD_KEY);
      return id;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = new TokenServise();
