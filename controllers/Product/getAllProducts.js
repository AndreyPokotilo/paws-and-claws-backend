const { Product } = require("../../models/product");
const { pagination, sort } = require("../../helpers");

const getAllProducts = async (req, res) => {
  const { page = 1, sortBy } = req.query;

  const result = await pagination({
    Model: Product,
    page: Number(page),
    collectionLinks: ["_pet", "_category", "_variant", "_country"],
    sortBy,
  });
  res.json({ ...result });
};

module.exports = getAllProducts;