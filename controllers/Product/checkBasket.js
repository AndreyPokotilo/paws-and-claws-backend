const { Product } = require("../../models/product");
const { pagination, sort, HttpError, isEnough } = require("../../helpers");

const checkBasket = async (req, res) => {
  const results = await isEnough(req, res);

  if (results.errors.length > 0) {
    return res.status(400).json({
      code: 400,
      data: results.data,
      errors: results.errors,
    });
  }

  res.json({
    code: 200,
    data: results.data,
  });
};

module.exports = checkBasket;
