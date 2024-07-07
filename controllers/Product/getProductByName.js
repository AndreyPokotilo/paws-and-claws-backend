const { Product } = require('../../models/product');
const { FindByNameOrBrandSchema } = require('../../models/product');
const { HttpError, pagination, sort, sortWeights } = require('../../helpers');

const getProductByName = async (req, res) => {
  const {
    findBy,
    page = 1,
    sortBy,
    maxPrice,
    minPrice,
    brands,
    availability,
    category,
  } = req.query;

  // console.log(findBy);
  const booleanAvailability = availability === 'true';

  if (!findBy) {
    throw HttpError(400, "Query parameter 'findBy' is required");
  }

  // Закодування символів в findBy

  // Розкодування параметра findBy
  const decodedFindBy = decodeURIComponent(findBy);

  const toLowerCase = decodedFindBy.toLocaleLowerCase();

  const validationResult = FindByNameOrBrandSchema.validate(req.query);

  if (validationResult.error) {
    throw HttpError(400, validationResult.error);
  }

  const results = await pagination({
    Model: Product,
    page: Number(page),
    sortBy,
    filter: {
      $or: [
        { productName: toLowerCase && new RegExp(escapeRegExp(toLowerCase), 'i') },
        { brand: toLowerCase && new RegExp(escapeRegExp(toLowerCase), 'i') },
        { shortDescription: toLowerCase && new RegExp(escapeRegExp(toLowerCase), 'i') },
      ],
    },
    collectionLinks: ['_pet', '_category', '_variant', '_country'],
    aggregate: true,
    minPrice,
    maxPrice,
    brands,
    availability: booleanAvailability,
    category,
  });

  // if (results.docs.length === 0) {
  //   throw HttpError(400, "Product not found");
  // }

  res.json({
    code: 200,
    ...results,
    docs: results.docs,
    sortBy,
  });
};

// Додана функція для екранування символів у регулярному виразі
function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

module.exports = getProductByName;
