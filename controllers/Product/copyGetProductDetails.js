const { Product } = require("../../models/product");
const { sortWeightsOne } = require("../../helpers");

const copyGetProductDetails = async (req, res) => {
  const { idProduct } = req.params;

  const result = await Product.findOne({ "items.productCode": idProduct }, "-min_sale").populate(
    "_pet _category _variant _country"
  );

  res.json(sortWeightsOne(result));
};

module.exports = copyGetProductDetails;
