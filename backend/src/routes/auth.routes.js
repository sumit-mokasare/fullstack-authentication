import { Router } from "express";
import {
  forgotPassword,
  getProfile,
  googleCallback,
  googleLogin,
  loginUser,
  logoutUser,
  refreshAccessToken,
  Register,
  resetPassword,
  updateUserAvatar,
  verifyUser,
} from "../controllers/auth.controllers.js";
import {
  userLoginValidetor,
  userRegistrationValidator,
  userResetPasswordValidetor
} from "../validators/index.js";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
import { validator } from "../middlewares/validate.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";


const router = Router();

router
  .route("/register")
  .post(
    upload.single("avatar"),
    userRegistrationValidator(),
    validator,
    Register,
  );
router.route("/verify/:token").get(verifyUser);
router.route("/login").post(upload.none(), userLoginValidetor(), validator, loginUser);
router.route("/profile").get(verifyJwt , getProfile);
router.route("/logout").post(verifyJwt , logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-password").post( upload.none(), verifyJwt , forgotPassword);
router.route("/reset-password/:token").post(upload.none(), userResetPasswordValidetor() , validator , resetPassword);
router.route("/updateAvatar").post(upload.single("avatar"), verifyJwt , updateUserAvatar);
router.route("/google").get(googleLogin)
router.route("/google/callback").get(googleCallback)
export default router;
