const { Router } = require("express");
const router = Router();

const ctrlStructure = require("../../controllers/structure");

router.get("/pets", ctrlStructure.getPetsStructure);
router.get("/pets/:idPet/categories", ctrlStructure.getCategoriesStructure);
router.get("/pets/:idPet/categories/:idCategory/variants", ctrlStructure.getVariantsStructure);
router.get("/all", ctrlStructure.getAllStructure);

module.exports = router;
