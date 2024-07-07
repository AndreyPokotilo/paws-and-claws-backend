const { Product } = require("../../models/product");
const { sortWeights, sort, sortWe } = require("../../helpers");
const { LIMIT_PAGINATION } = require("../../config/consts");

const getHomeProducts = async (req, res) => {
  const result = await Product.find({
    items: {
      $elemMatch: {
        count: { $gt: 0 },
        sale: { $exists: true },
      },
    },
  })
    .populate("_pet _category _variant _country")
    .limit(LIMIT_PAGINATION);

  res.json(sort(result));
};

module.exports = getHomeProducts;
