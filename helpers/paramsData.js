const aggregateParams = ({
  minPrice = 0,
  maxPrice = 100000000,
  filter,
  sortBy,
  brands,
  availability,
  //category = 'dry_cat_food, food_for_cats',
  //category = 'food_for_kittens',
  category,
}) => {
  let sortValue;

  if (sortBy === 'expensive') {
    sortValue = -1; // Sorting by weight from larger to smaller
  } else if (sortBy === 'cheap') {
    sortValue = 1; // Sorting by weight from smaller to larger
  }

  const aggregationPipeline = [
    {
      $lookup: {
        from: 'pets', // Collection name with _pet data
        let: { petId: '$_pet' }, // Variable declaration for ObjectId from the _pet field
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$_id', '$$petId'] }, // Finding ObjectId match in pets collection
            },
          },
        ],
        as: 'petData', // New field name to store _pet data
      },
    },
    {
      $lookup: {
        from: 'categories', // Collection name with category data
        let: { categoryId: '$_category' }, // Variable for ObjectId from the _category field
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$_id', '$$categoryId'] }, // Finding ObjectId match in categories collection
            },
          },
        ],
        as: 'categoryData', // New field name to store category data
      },
    },
    {
      $lookup: {
        from: 'variants', // Collection name with variant data
        let: { variantId: '$_variant' }, // Variable for ObjectId from the _variant field
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$_id', '$$variantId'] }, // Finding ObjectId match in variants collection
            },
          },
        ],
        as: 'variantData', // New field name to store variant data
      },
    },
    {
      $lookup: {
        from: 'countries', // Collection name with country data
        let: { countryId: '$_country' }, // Variable for ObjectId from the _country field
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$_id', '$$countryId'] }, // Finding ObjectId match in countries collection
            },
          },
        ],
        as: 'countryData', // New field name to store country data
      },
    },
    // Unfolding arrays
    {
      $unwind: '$items', // Unwinding the array of item objects
    },
    // {
    //   $match: {
    //     'items.count': { $gt: 0 }, // Filter to exclude items with count: 0
    //   },
    // },

    {
      $addFields: {
        'items.isZeroCount': { $eq: ['$items.count', 0] },
      },
    },
    {
      $sort: {
        'items.isZeroCount': 1,
      },
    },

    {
      $unwind: {
        path: '$petData',
        preserveNullAndEmptyArrays: true, // Preserving objects without a match in pets
      },
    },
    {
      $unwind: {
        path: '$categoryData',
        preserveNullAndEmptyArrays: true, // Preserving objects without a match in categories
      },
    },
    {
      $unwind: {
        path: '$variantData',
        preserveNullAndEmptyArrays: true, // Preserving objects without a match in variants
      },
    },
    {
      $unwind: {
        path: '$countryData',
        preserveNullAndEmptyArrays: true, // Preserving objects without a match in countries
      },
    },

    // adding fields
    {
      $addFields: {
        'items.originalId': { $toString: '$_id' }, // Converting _id to string and saving it as items.originalId
        'items.actualPrice': {
          $cond: {
            if: { $gte: ['$items.sale', 0] }, // Using the sale price if available
            then: '$items.sale',
            else: '$items.price', // Otherwise using the regular price
          },
        },
        _pet: '$petData', // _pet field containing data found using ObjectId
        _category: '$categoryData', // _category field containing data found using ObjectId
        _variant: '$variantData', // _variant field containing data found using ObjectId
        _country: '$countryData', // _country field containing data found using ObjectId
      },
    },

    {
      $match: {
        $and: [
          {
            'items.actualPrice': { $gte: Number(minPrice), $lte: Number(maxPrice) }, // Filtering by actualPrice
          },
          filter,
        ],
      },
    },
    {
      $group: {
        _id: '$_id',
        productName: { $first: '$productName' },
        brand: { $first: '$brand' },
        shortDescription: { $first: '$shortDescription' },
        fullDescription: { $first: '$fullDescription' },
        mainImage: { $first: '$mainImage' },
        images: { $first: '$images' },
        favorite: { $first: '$favorite' },
        reviews: { $first: '$reviews' },
        _pet: { $first: '$_pet' },
        _category: { $first: '$_category' },
        _variant: { $first: '$_variant' },
        _country: { $first: '$_country' },
        updatedAt: { $first: '$updatedAt' },
        items: {
          $push: {
            _id: '$items.originalId', // Assign the stored _id value from items.originalId
            size: '$items.size', // Continue saving other "items" fields
            price: '$items.price',
            count: '$items.count',
            productCode: '$items.productCode',
            actualPrice: '$items.actualPrice',
            sale: '$items.sale',
          },
        },
      },
    },
    {
      $project: {
        petData: 0, // Delete temporary field petData
        categoryData: 0, // Delete temporary field categoryData
        variantData: 0, // Delete temporary field variantData
        countryData: 0, // Delete temporary field countryData
      },
    },
  ];
  // declare a brands array for immutable coding
  let brandsArray;

  // find and set the index for inserting the required sorting by weight in the array $items
  const indexForWeightSortingAdd =
    aggregationPipeline.findIndex(obj => obj.$unwind === '$items') + 1;

  // Apply to show only available goods if "availability" is true
  if (availability) {
    aggregationPipeline.splice(indexForWeightSortingAdd, 0, {
      $match: {
        'items.count': { $gt: 0 }, // Filter to exclude items with count: 0
      },
    });
  }

  // Apply sorting only if sortValue is defined as desired
  if (sortValue === 1 || sortValue === -1) {
    aggregationPipeline.splice(indexForWeightSortingAdd, 0, {
      $sort: { 'items.size': sortValue }, // Sorting depending on sortValue
    });
  }
  // If sortBy is not defined, use sorting by sale field
  if (sortBy === undefined) {
    // Sorting inside items by sale field
    aggregationPipeline.splice(indexForWeightSortingAdd, 0, {
      $sort: {
        'items.sale': 1, // sorting by increasing sale
        'items.size': 1, // sorting by increasing size
      },
    });
  }

  // If brands are exist and they are string,  trim to exlude whitespaces
  if (brands && typeof brands === 'string') {
    brandsArray = brands.split(',').map(brand => brand.trim());
  }
  // add brands array to pipeline
  if (brandsArray && brandsArray.length > 0) {
    aggregationPipeline.unshift({
      $match: { brand: { $in: brandsArray } },
    });
  }

  // Check if filer category is exists
  if (category && typeof category === 'string') {
    const categoryArray = category.split(',').map(item => item.trim());

    if (categoryArray.length > 0) {
      const categoryMatch = {
        $or: [
          { '_pet.code': { $in: categoryArray } },
          { '_category.code': { $in: categoryArray } },
          { '_variant.code': { $in: categoryArray } },
        ],
      };

      aggregationPipeline.push({ $match: categoryMatch });
    }
  }

  return aggregationPipeline;
};

module.exports = { aggregateParams };
