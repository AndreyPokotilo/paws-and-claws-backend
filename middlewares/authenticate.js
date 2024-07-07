const { HttpError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { ACCESS_SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  console.log("token:", token)

  if (bearer !== "Bearer" || !token) {
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, ACCESS_SECRET_KEY);
    const user = await User.findById(id);
    // console.log("user:", user)

    if (!user || !user.accessToken) {
      next(HttpError(401));
    }

    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = authenticate;
