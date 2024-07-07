const { Product } = require("../models/product");
const HttpError = require("./HttpError");

const isEnought = async (req, res) => {
  const { array } = req.body;
  const results = [];
  const errorCods = [];

  await Promise.all(
    array.map(async (el) => {
      const result = await Product.findOne({ "items.productCode": el.productCode });

      if (!result) {
        throw HttpError(400, "The product not found");
      }

      const obj = result.items.find((item) => item.productCode === el.productCode);

      if (obj.count < el.cardCount) {
        errorCods.push(obj);
      } else {
        results.push(obj);
      }
    })
  );

  return {
    data: results,
    errors: errorCods,
  };
};

module.exports = isEnought;
