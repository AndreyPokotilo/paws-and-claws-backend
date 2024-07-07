const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { hendleMongooseError } = require("../helpers");
const { emailRegexp, passwordRegexp } = require("../utils/regexp");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      minlength: 6,
      match: passwordRegexp,
      required: [true, "Password is required"],
    },
    accessToken: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
      default: "",
    },
    resetPasswordToken: {
      type: String,
      default: "",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", hendleMongooseError);

const User = model("User", userSchema);

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": 'The "Name" field must be a string',
    "any.required": 'The "Name" field is required',
  }),
  email: Joi.string().required().messages({
    "string.base": 'The "Email" field must be a string',
    "string.pattern.base": "Enter a valid email address",
    "any.required": 'The "Email" field is required',
  }),
  password: Joi.string().min(6).pattern(passwordRegexp).required().messages({
    "string.base": 'The "Password" field must be a string',
    "string.min": "Password must be at least {#limit} characters long",
    "string.max": "Password must not exceed {#limit} characters",
    "string.pattern.base": "Password must contain at least 1 uppercase letter, 1 lowercase letter,",
    "any.required": 'The "Password" field is required',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.base": 'The "Email" field must be a string',
    "string.pattern.base": "Enter a valid email address",
    "any.required": 'The "Email" field is required',
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": 'The "Password" field must be a string',
    "string.min": "Password must be at least {#limit} characters long",
    "any.required": 'The "Password" field is required',
  }),
});



const emailSchema = Joi.object({
  email: Joi.string().required().messages({
    "string.base": 'The "Email" field must be a string',
    "string.pattern.base": "Enter a valid email address",
    "any.required": 'The "Email" field is required',
  }),
});

const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.base": 'The "Password" field must be a string',
    "string.min": "Password must be at least {#limit} characters long",
    "any.required": 'The "Password" field is required',
  }),
  resetPasswordToken: Joi.string(),
});

module.exports = {
  User,
  registerSchema,
  loginSchema,

  emailSchema,
  resetPasswordSchema,
};
