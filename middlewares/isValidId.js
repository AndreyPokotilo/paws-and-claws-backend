const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const paramsId = Object.values(req.params)[0];

  if (!isValidObjectId(paramsId)) {
    next(HttpError(400, `${paramsId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
