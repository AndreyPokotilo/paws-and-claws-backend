const { Product } = require('../../models/product');

const getAllBrands = async (req, res) => {
  const result = await Product.distinct('brand');

  res.json(result);
};

module.exports = getAllBrands;
