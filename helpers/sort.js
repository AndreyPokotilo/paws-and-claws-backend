const { sortWeights, sortWe } = require("./sortWeights");

const sort = (product, sortBy, aggregate) => {
  let data;

  if (!aggregate) {
    const sortedWeight = sortWe(product);
    data = sortedWeight.map((el) => el);
  } else {
    data = product;
  }

  if (!sortBy) {
    data = data.sort((a, b) => {
      const hasCountA = a.items.some((item) => item.count > 0);
      const hasCountB = b.items.some((item) => item.count > 0);

      if (hasCountA && !hasCountB) {
        return -1;
      }
      if (!hasCountA && hasCountB) {
        return 1;
      }

      return 0;
    });

    return data;
  }

  if (sortBy) {
    switch (sortBy) {
      case "expensive":
        data = data.sort((a, b) => {
          if (a.items.some((item) => item.count > 0) && b.items.every((item) => item.count === 0)) {
            return -1;
          }
          if (a.items.every((item) => item.count === 0) && b.items.some((item) => item.count > 0)) {
            return 1;
          }

          const priceA = a.items[0].sale || a.items[0].price;
          const priceB = b.items[0].sale || b.items[0].price;

          return priceB - priceA;
        });
        break;
      case "cheap":
        data = data.sort((a, b) => {
          if (a.items.some((item) => item.count > 0) && b.items.every((item) => item.count === 0)) {
            return -1;
          }
          if (a.items.every((item) => item.count === 0) && b.items.some((item) => item.count > 0)) {
            return 1;
          }

          const priceA = a.items[0].sale || a.items[0].price;
          const priceB = b.items[0].sale || b.items[0].price;

          return priceA - priceB;
        });
        break;
      case "discounts":
        data = sortWe(product);
        data = data.sort((a, b) => {
          const hasCountA = a.items.some((item) => item.count > 0 && item.sale);
          const hasCountB = b.items.some((item) => item.count > 0 && item.sale);

          if (hasCountA && !hasCountB) {
            return -1;
          }
          if (!hasCountA && hasCountB) {
            return 1;
          }

          return 0;
        });
      default:
        break;
    }
  }

  return data;
};

module.exports = sort;
