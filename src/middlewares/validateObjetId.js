import mongoose from "mongoose";

const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(400)
      .json({ message: "Se espera un id valido de mongodb" });
  }

  next();
};

export default validateObjectId;
