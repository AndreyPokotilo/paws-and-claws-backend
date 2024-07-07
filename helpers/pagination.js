const sort = require('./sort');
const { LIMIT_PAGINATION } = require('../config/consts');
const { aggregateParams } = require('./paramsData');
const brandsCount = require('./brandsCount');
const minMaxPriceRange = require('./minMaxPriceRange');
const categories = require('./categories');

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 10000000000;

module.exports = async ({
  Model,
  filter = {},
  page = 1,
  limit = LIMIT_PAGINATION,
  collectionLinks = [],
  sortBy = 'cheap', // This field is required because the "load more" functionality may respond incorrectly with the same goods if not specified.
  minPrice = DEFAULT_MIN_PRICE,
  maxPrice = DEFAULT_MAX_PRICE,
  brands, // Comma-separated string of brands
  availability,
  aggregate,
  category,
}) => {
  const data = {};
  // Set to true if the price range is set
  const isPriceRangeSet =
    minPrice !== DEFAULT_MIN_PRICE && maxPrice !== DEFAULT_MAX_PRICE ? true : false;
  const isBrandsSet = brands ? true : false;

  try {
    let result;
    let resultDefault;
    let resultBrands;
    let resultCategory;

    if (aggregate) {
      result = await Model.aggregate(
        aggregateParams({
          minPrice,
          maxPrice,
          filter,
          sortBy,
          brands,
          availability,
          category,
        }),
      );

      if (brands || isPriceRangeSet || category) {
        resultBrands = await Model.aggregate(
          aggregateParams({
            minPrice,
            maxPrice,
            filter,
            sortBy,
            availability,
            category,
          }),
        );
      }

      if (isPriceRangeSet || category || brands) {
        resultCategory = await Model.aggregate(
          aggregateParams({
            minPrice,
            maxPrice,
            filter,
            sortBy,
            availability,
            brands,
            category,
          }),
        );
      }

      if (availability) {
        resultDefault = await Model.aggregate(
          aggregateParams({
            filter,
            availability,
          }),
        );
      }

      if (!availability) {
        resultDefault = await Model.aggregate(
          aggregateParams({
            filter,
          }),
        );
      }

      // Calculate categories count based on the conditions (price range set or brands present)
      data.categories = categories(
        resultDefault,

        isBrandsSet ? (category ? resultCategory : result) : undefined,
      );

      data.totalDocs = result.length;
      // Calculate brand count based on conditions (brands set, price range set, or category present)
      data.brandsDefault = brandsCount(
        resultDefault,
        isBrandsSet || isPriceRangeSet || category ? resultBrands : undefined,
      );
      data.minMax = minMaxPriceRange(resultDefault);
    } else {
      result = await Model.find(filter, '-min_sale').populate(collectionLinks.join(' '));
      data.totalDocs = await Model.count(filter);
    }

    const sortedResult = sort(result, sortBy, aggregate);
    const paginatedResult = sortedResult.slice((page - 1) * limit, page * limit);

    data.docs = paginatedResult;
    data.limit = limit;
    data.totalPages = Math.ceil(data.totalDocs / limit);
    data.page = page;
    data.hasNextPage = data.page < data.totalPages ? true : null;
    data.hasPrevPage = data.page > 1 ? true : null;
    data.nextPage = data.page < data.totalPages ? data.page + 1 : null;
    data.prevPage = data.page > 1 ? data.page - 1 : null;

    return data;
  } catch (err) {
    throw new Error(err);
  }
};
