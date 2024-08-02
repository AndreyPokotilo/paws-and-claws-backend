const ctrlErrorHandler = (ctrl) => {
  console.log("ctrl:", ctrl)
  const func = async (req, res, next) => {
    console.log("res:", res)
    console.log("req:", req)
    try {
      await ctrl(req, res, next);
    } catch (err) {
      console.log("ctrlErrorHandler:", err)
      next(err);
    }
  };

  return func;
};

module.exports = ctrlErrorHandler;
