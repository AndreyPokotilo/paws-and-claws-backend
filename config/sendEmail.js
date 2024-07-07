const nodemailer = require("nodemailer");
const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "paws-and-claws-shop@meta.ua",
    pass: META_PASSWORD,
  },
};

module.exports = nodemailerConfig;
