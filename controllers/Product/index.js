const { ctrlErrorHandler } = require('../../helpers');

const getHomeProducts = require('./getHomeProducts');
const getAllProducts = require('./getAllProducts');
const getProductsByPet = require('./getProductsByPet');
const getProductsByCategory = require('./getProductsByCategory');
const getProductsByTypeProduct = require('./getProductsByTypeProduct');
const getProductDetails = require('./getProductDetails');
const getProductByName = require('./getProductByName');
const checkBasket = require('./checkBasket');
const buyProduct = require('./buyProduct');
const copyGetProductDetails = require('./copyGetProductDetails');
const getAllBrands = require('./getAllBrands');

module.exports = {
  getHomeProducts: ctrlErrorHandler(getHomeProducts),
  getAllProducts: ctrlErrorHandler(getAllProducts),
  getProductsByPet: ctrlErrorHandler(getProductsByPet),
  getProductsByCategory: ctrlErrorHandler(getProductsByCategory),
  getProductsByTypeProduct: ctrlErrorHandler(getProductsByTypeProduct),
  getProductDetails: ctrlErrorHandler(getProductDetails),
  getProductByName: ctrlErrorHandler(getProductByName),
  checkBasket: ctrlErrorHandler(checkBasket),
  buyProduct: ctrlErrorHandler(buyProduct),
  copyGetProductDetails: ctrlErrorHandler(copyGetProductDetails),
  test: ctrlErrorHandler(require('./test')),
  getAllBrands: ctrlErrorHandler(getAllBrands),
};
