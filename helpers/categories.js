const categories = (data, currentData) => {
  const resultObject = {};

  // if data is default without filters except sorting use data object insted data with filters
  for (const item of currentData ? currentData : data) {
    if (!resultObject[item._pet._id]) {
      resultObject[item._pet._id] = {
        code: item._pet.code,
        en: item._pet.en,
        ua: item._pet.ua,
        count: 0,
        _categories: {},
        _id: item._pet._id,
      };
    }

    if (!resultObject[item._pet._id]._categories[item._category._id]) {
      resultObject[item._pet._id]._categories[item._category._id] = {
        code: item._category.code,
        en: item._category.en,
        ua: item._category.ua,
        count: 0,
        _variants: {},
        _id: item._category._id,
        _pet: item._category._pet,
      };
    }

    if (!resultObject[item._pet._id]._categories[item._category._id]._variants[item._variant._id]) {
      resultObject[item._pet._id]._categories[item._category._id]._variants[item._variant._id] = {
        code: item._variant.code,
        en: item._variant.en,
        ua: item._variant.ua,
        count: 0,
        _category: item._variant._category,
        _id: item._variant._id,
        _pet: item._variant._pet,
      };
    }
    // Збільшуємо лічильники
    resultObject[item._pet._id].count += 1;
    resultObject[item._pet._id]._categories[item._category._id].count += 1;
    resultObject[item._pet._id]._categories[item._category._id]._variants[
      item._variant._id
    ].count += 1;
  }
  // if currentData defined and object data is not available create data with count 0
  if (currentData) {
    for (const itemData of data) {
      const petId = itemData._pet._id;
      const categoryId = itemData._category._id;
      const variantId = itemData._variant._id;

      if (!resultObject[petId]) {
        resultObject[petId] = {
          code: itemData._pet.code,
          en: itemData._pet.en,
          ua: itemData._pet.ua,
          count: 0,
          _categories: {},
          _id: itemData._pet._id,
        };
      }

      if (!resultObject[petId]._categories[categoryId]) {
        resultObject[petId]._categories[categoryId] = {
          code: itemData._category.code,
          en: itemData._category.en,
          ua: itemData._category.ua,
          count: 0,
          _variants: {},
          _id: categoryId,
          _pet: itemData._category._pet,
        };
      }

      if (!resultObject[petId]._categories[categoryId]._variants[variantId]) {
        resultObject[petId]._categories[categoryId]._variants[variantId] = {
          code: itemData._variant.code,
          en: itemData._variant.en,
          ua: itemData._variant.ua,
          count: 0,
          _category: itemData._variant._category,
          _id: variantId,
          _pet: itemData._variant._pet,
        };
      }
    }
  }

  // Transform objects into arrays for output
  const resultArray = Object.values(resultObject).map(pet => {
    pet._categories = Object.values(pet._categories).map(category => {
      category._variants = Object.values(category._variants);
      category._variants = sortedByUaValue(category._variants);
      return category;
    });
    pet._categories = sortedByUaValue(pet._categories);
    return pet;
  });

  function sortedByUaValue(data) {
    const sortedData = [...data].sort((a, b) => {
      const valueA = a.ua.toUpperCase(); // ignore upper and lowercase
      const valueB = b.ua.toUpperCase(); // ignore upper and lowercase

      if (valueA < valueB) {
        return -1;
      }
      if (valueA > valueB) {
        return 1;
      }
      // names must be equal
      return 0;
    });

    return sortedData;
  }
  // sort array from A to Z
  return sortedByUaValue(resultArray);
};

module.exports = categories;
