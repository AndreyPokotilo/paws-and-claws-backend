const { ctrlErrorHandler } = require("../helpers");
const { Pet, Category, Variant } = require("../models/structure");

const getPetsStructure = async (req, res) => {
  const result = await Pet.find();
  res.json(result);
};

const getCategoriesStructure = async (req, res) => {
  const { idPet } = req.params;
  const categories = await Category.find({ _pet: idPet }).populate("_pet");
  res.json(categories);
};

const getVariantsStructure = async (req, res) => {
  const { idPet, idCategory } = req.params;
  const variants = await Variant.find({ _pet: idPet, _category: idCategory }).populate(
    "_pet _category"
  );
  res.json(variants);
};

const getAllStructure = async (req, res) => {
  const pets = await Pet.find();
  const categories = await Category.find();
  const variants = await Variant.find();

  const dataPets = pets.map((pet) => {
    const dataPet = {};

    dataPet._id = pet._id;
    dataPet.ua = pet.ua;
    dataPet.en = pet.en;
    dataPet.code = pet.code;
    dataPet._categories = [];

    return dataPet;
  });

  const dataCategories = categories.map((category) => {
    const dataCategory = {};

    dataCategory._id = category._id;
    dataCategory.ua = category.ua;
    dataCategory.en = category.en;
    dataCategory.code = category.code;
    dataCategory._pet = category._pet;
    dataCategory._variants = [];

    return dataCategory;
  });

  variants.forEach((item) => {
    const id_category = item._category.toString();

    dataCategories.forEach((category) => {
      if (id_category === category._id.toString()) {
        category._variants.push(item);
      }
    });
  });

  dataCategories.forEach((item) => {
    const id_pet = item._pet.toString();

    dataPets.forEach((pet) => {
      if (id_pet === pet._id.toString()) {
        pet._categories.push(item);
      }
    });
  });

  res.json(dataPets);
};

module.exports = {
  getPetsStructure: ctrlErrorHandler(getPetsStructure),
  getCategoriesStructure: ctrlErrorHandler(getCategoriesStructure),
  getVariantsStructure: ctrlErrorHandler(getVariantsStructure),
  getAllStructure: ctrlErrorHandler(getAllStructure),
};

// class Controler {
//   constructor({ model }) {
//     this.Model = model;
//   }

//   getAllStructure = async (req, res) => {
//     const result = await this.Model.find();
//     res.json(result);
//   };
// }

// const base = new Controler({ model: Pet });
// console.log("base:", base);
