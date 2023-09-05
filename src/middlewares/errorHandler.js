import { EError } from "../enums/Errors.js";

export const errorHandler = (error, req, res, next) => {
  switch (error.code) {
    case EError.INVALID_JSON:
      res
        .status(400)
        .json({
          status: "error",
          message: "JSON inválido",
          details: error.message,
        });
      break;
    case EError.DATABASE_ERROR:
      res
        .status(500)
        .json({
          status: "error",
          message: "Error de base de datos",
          details: error.message,
        });
      break;
    case EError.INVALID_PARAM:
      res
        .status(400)
        .json({
          status: "error",
          message: "Parámetro inválido",
          details: error.message,
        });
      break;
    default:
      res
        .status(500)
        .json({
          status: "error",
          message: "Hubo un error, contacte al equipo de soporte.",
          details: error.message,
        });
      break;
  }
  next();
};
