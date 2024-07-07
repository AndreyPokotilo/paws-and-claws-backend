const { Product } = require("../../models/product");
const { pagination, sort } = require("../../helpers");

const getProductsByCategory = async (req, res) => {
  const { page = 1, sortBy } = req.query;
  const { idCategory } = req.params;

  const result = await pagination({
    Model: Product,
    page: Number(page),
    filter: { _category: idCategory },
    collectionLinks: ["_pet", "_category", "_variant", "_country"],
    sortBy,
  });

  res.json({ ...result });
};

module.exports = getProductsByCategory;
