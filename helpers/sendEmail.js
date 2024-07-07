const { transporter } = require("../config");

const sendEmail = async (data) => {
  const email = { from: "paws-and-claws-shop@meta.ua", ...data };
  await transporter.sendMail(email);
};

module.exports = sendEmail;
