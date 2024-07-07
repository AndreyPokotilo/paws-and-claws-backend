const { Product } = require("../../models/product");
const { FindByNameOrBrandSchema } = require("../../models/product");
const { HttpError, pagination, sort, sortWeights, sortWe } = require("../../helpers");

const test = async (req, res) => {
  const result = await Product.find();

  const results = sortWe(result);

  res.json({ results });
};

module.exports = test;

//  const sortResult = result.sort((a, b) => {
//    const first = a.items.some((item) => item.count > 0);
//    const second = b.items.some((item) => item.count > 0);

//    if (first && !second) {
//      return -1;
//    }

//    if (!first && second) {
//      return 1;
//    }

//    return 0;
//  });
