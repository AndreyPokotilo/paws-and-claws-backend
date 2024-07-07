const minMaxPriceRange = data => {
  if (data.length === 0) {
    return [];
  }
  const allPrices = data.flatMap(item => {
    const priceItems = item.items.map(item => {
      if (item.sale) {
        return item.sale;
      }
      return item.price;
    });
    return priceItems;
  });

  return [Math.floor(Math.min(...allPrices)), Math.ceil(Math.max(...allPrices))];
};

module.exports = minMaxPriceRange;
