const { Product } = require("../../models/product");
const { sortWeightsOne } = require("../../helpers");

const getProductDetails = async (req, res) => {
  const { idProduct } = req.params;

  const result = await Product.findById(idProduct, "-min_sale").populate(
    "_pet _category _variant _country"
  );

  res.json(sortWeightsOne(result));
};

module.exports = getProductDetails;
