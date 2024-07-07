// Function to count the occurrence of brands in the provided data
const brandsCount = (data, dataFiltered) => {
  // Filtering and counting brands in the main data
  const filterBrands = data.reduce((prev, element) => {
    if (!prev[element.brand]) {
      prev[element.brand] = 0;
    }
    prev[element.brand] += 1;
    return prev;
  }, {});

  let filterBrandsCategoryAll;

  // If dataFiltered is provided, filter and count brands with filtered data
  if (dataFiltered) {
    const filterBrandsCategory = dataFiltered.reduce((prev, element) => {
      if (!prev[element.brand]) {
        prev[element.brand] = 0;
      }
      prev[element.brand] += 1;
      return prev;
    }, {});

    // Ensure all brands present in the main data are included, even if not in the category data
    filterBrandsCategoryAll = Object.keys(filterBrands).reduce(
      (obj, key) => {
        if (!obj[key]) {
          obj[key] = 0;
        }
        return obj;
      },
      { ...filterBrandsCategory },
    );
  }

  // Sorting the brand count object alphabetically
  function sorted(dataObject) {
    const sorted = Object.keys(dataObject)
      .sort()
      .reduce((obj, key) => {
        obj[key] = dataObject[key];
        return obj;
      }, {});
    return sorted;
  }

  // Sorting brands based on whether category data is provided or not
  const sortedBrands = sorted(dataFiltered ? filterBrandsCategoryAll : filterBrands);

  return sortedBrands;
};

module.exports = brandsCount;
