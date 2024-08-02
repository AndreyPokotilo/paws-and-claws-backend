const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { engine } = require("express-handlebars");
require("dotenv").config();

const productsRouter = require("./routes/api/products");
const structureRouter = require("./routes/api/structure");
const authRouter = require("./routes/api/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

console.log("formatsLogger:", formatsLogger);

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.engine("handlebars", engine());

app.set("view engine", "handlebars");
app.set("views", "./views");

app.use("/api/products", productsRouter);
app.use("/api/structure", structureRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
