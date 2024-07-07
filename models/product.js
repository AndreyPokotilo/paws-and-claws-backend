const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Joi = require('joi');

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product name is required'],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
    },
    items: [
      {
        size: {
          type: Number,
          required: [true, 'Size is required'],
        },
        price: {
          type: Number,
          required: [true, 'Size is required'],
        },
        sale: {
          type: Number,
        },
        count: {
          type: Number,
          required: [true, 'Count is required'],
        },
        productCode: {
          type: String,
          unique: true,
        },
      },
    ],
    shortDescription: {
      type: String,
    },
    fullDescription: {
      type: String,
    },
    ingredients: {
      type: String,
    },
    mainImage: {
      type: String,
    },
    images: {
      type: [String],
    },
    favorite: {
      type: Boolean,
      required: true,
      default: false,
    },
    reviews: {
      type: [String],
    },
    _pet: {
      type: Schema.Types.ObjectId,
      ref: 'Pet',
    },
    _category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    _variant: {
      type: Schema.Types.ObjectId,
      ref: 'Variant',
    },
    _country: {
      type: Schema.Types.ObjectId,
      ref: 'Country',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

productSchema.plugin(mongoosePaginate);

const Product = model('product', productSchema);

const FindByNameOrBrandSchema = Joi.object({
  findBy: Joi.string().min(3).messages({
    'string.min': 'Мінімальна кількість символів 3',
  }),
  page: Joi.number().integer().messages({
    'number.base': 'The "page" field must be a number',
    'number.integer': 'The "page" field must be an integer',
  }),
  findBy: Joi.string().min(3).messages({
    'string.min': 'Мінімальна кількість символів 3',
  }),

  sortBy: Joi.string(),
  minPrice: Joi.string(),
  maxPrice: Joi.string(),
  brands: Joi.string(),
  availability: Joi.boolean(),
  category: Joi.string(),
});

module.exports = {
  Product,
  FindByNameOrBrandSchema,
};
