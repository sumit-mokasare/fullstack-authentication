import { body } from "express-validator";

const userRegistrationValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is Invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username should be at least 3 char ")
      .isLength({ mix: 13 })
      .withMessage("Username cannot exceed 13 char"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 6 char")
      .matches(/[A-Z]/)
      .withMessage("Password must contain one uppercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain one number")
      .matches(/[@$!%*?&]/)
      .withMessage("Password must contain one special character"),
  ];
};

const userLoginValidetor = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is Invalid"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 6 char")
      .matches(/[A-Z]/)
      .withMessage("Password must contain one uppercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain one number")
      .matches(/[@$!%*?&]/)
      .withMessage("Password must contain one special character"),
  ];
};


const userResetPasswordValidetor = () => {
  return [
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 6 char")
      .matches(/[A-Z]/)
      .withMessage("Password must contain one uppercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain one number")
      .matches(/[@$!%*?&]/)
      .withMessage("Password must contain one special character"),
  ];
};

export {
  userRegistrationValidator,
  userLoginValidetor,
  userResetPasswordValidetor
};
