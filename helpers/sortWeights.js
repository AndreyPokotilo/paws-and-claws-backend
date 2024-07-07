// sortWeights.js

// sortWeights.js

const sortWeights = (product) => {
  return product.map((el) => {
    el.items.sort((a, b) => {
      if (a.count === 0 && b.count !== 0) {
        return 1;
      }
      if (a.count !== 0 && b.count === 0) {
        return -1;
      }

      return a.size - b.size;
    });

    return el;
  });
};

const sor = (data) => {
  return data.map((el) => {
    el.items.forEach((weight) => {});
  });
};

const sortWe = (arr) => {
  return arr.map((item) => {
    const saled = [];

    const enable = [];
    const disable = [];

    item.items.forEach((weight) => {
      if (weight.sale && weight.count > 0) {
        saled.push(weight);
      } else if (weight.count > 0) {
        enable.push(weight);
      } else {
        disable.push(weight);
      }
    });

    item.items = [
      ...saled.sort((a, b) => a.size - b.size),
      ...enable.sort((a, b) => a.size - b.size),
      ...disable.sort((a, b) => a.size - b.size),
    ];

    return item;
  });
};

const sortWeightsOne = (item) => {
  const saled = [];
  const enable = [];
  const disable = [];

  item.items.forEach((weight) => {
    if (weight.sale && weight.count > 0) {
      saled.push(weight);
    } else if (weight.count > 0) {
      enable.push(weight);
    } else {
      disable.push(weight);
    }
  });

  item.items = [
    ...saled.sort((a, b) => a.size - b.size),
    ...enable.sort((a, b) => a.size - b.size),
    ...disable.sort((a, b) => a.size - b.size),
  ];

  return item;
};

module.exports = {
  sortWeights,
  sortWeightsOne,
  sortWe,
};
