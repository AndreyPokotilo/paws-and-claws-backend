const {Schema, model} = require('mongoose');

const petSchema = new Schema({
  ua: {
    type: String,
    required: true,
  },
  en: {
    type: String,
    required: true,
  },
  button_en: {
    type: String,
    required: true,
  },
  button_ua: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
});

const categorySchema = new Schema({
  ua: {
    type: String,
    required: true,
  },
  en: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  _pet: {
    type: Schema.Types.ObjectId,
    ref: 'Pet',
  }
});

const variantSchema = new Schema({
  ua: {
    type: String,
    required: true,
  },
  en: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  _pet: {
    type: Schema.Types.ObjectId,
    ref: 'Pet',
  },
  _category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
});

const countrySchema = new Schema({
  ua: {
    type: String,
    required: true,
  },
  en: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
});

const Pet = model('Pet', petSchema);
const Category = model('Category', categorySchema);
const Variant = model('Variant', variantSchema);
const Country = model('Country', countrySchema);

module.exports = {
  Pet,
  Category,
  Variant,
  Country,
};