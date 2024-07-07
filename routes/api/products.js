const { Router } = require("express");
const router = Router();

const { isValidId, validateBody } = require("../../middlewares");

const ctlr = require("../../controllers/Product");

const { FindByNameOrBrandSchema } = require("../../models/product");

// Перелік продуктів на стартову сторінку
router.get("/", ctlr.getHomeProducts);

// Перелік всіх продуктів
router.get("/allItems", ctlr.getAllProducts);

// Перелік всіх брендів
router.get("/brands", ctlr.getAllBrands);

// Перелік всіх продуктів, для тварин :idPet
router.get("/pets/:idPet", isValidId, ctlr.getProductsByPet);

// Перелік всіх продуктів, для тварин :idCategory
router.get("/categories/:idCategory", isValidId, ctlr.getProductsByCategory);

// Перелік всіх продуктів, для тварин :idVariant
router.get("/product_types/:idVariant", isValidId, ctlr.getProductsByTypeProduct);

// Повертає дані для одного продукту :idProduct
router.get("/:idProduct", ctlr.getProductDetails);

// Пошук по назві або бренду товара
router.get("/searchByKeyword/card", ctlr.getProductByName);

router.post("/checkBasket/card", ctlr.checkBasket);

router.post("/buyProduct", ctlr.buyProduct);

router.get("/copy/:idProduct", ctlr.copyGetProductDetails);

router.get("/test/test", ctlr.test);

module.exports = router;
