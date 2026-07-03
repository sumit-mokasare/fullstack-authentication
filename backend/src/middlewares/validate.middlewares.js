import { validationResult } from "express-validator";
import { ApiErro } from "../utils/api-error.js";

const validator = (req, res, next) => {
  const errors = validationResult(req);
  // console.log( 'error :::',errors);
  
  // console.log('all errros in validator := ' , errors );

  if (errors.isEmpty()) {
    return next();
  }

  const extractedError = [];

  errors.array().map((err) =>
    extractedError.push({
      [err.path]: err.msg,
    }),
  );

  // res.status(400).json(new ApiErro(422, "Recived data is not valid", extractedError));

  throw new ApiErro(422, "Recived data is not valid ", extractedError);
};

export { validator };
