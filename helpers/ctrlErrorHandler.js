const ctrlErrorHandler = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (err) {
      console.log("ctrlErrorHandler:", err)
      next(err);
    }
  };
  console.log("func:", func)

  return func;
};

module.exports = ctrlErrorHandler;
