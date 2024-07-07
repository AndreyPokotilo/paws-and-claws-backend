const { Product } = require("../../models/product");
const { HttpError, isEnough } = require("../../helpers");

const buyProduct = async (req, res) => {
  const { array } = req.body;

  const results = await isEnough(req, res);
  console.log("asda", results);

  if (results.errors.length > 0) {
    return res.status(400).json({
      code: 400,
      data: results.data,
      errors: results.errors,
    });
  }

  await Promise.all(
    array.map(async (el) => {
      const result = await Product.findOne({ "items.productCode": el.productCode });

      let obj = result.items.find((item) => item.productCode === el.productCode);

      obj.count -= el.cardCount;

      result.save();
    })
  );

  res.json({
    code: 200,
    message: "Success operation",
  });
};

module.exports = buyProduct;
