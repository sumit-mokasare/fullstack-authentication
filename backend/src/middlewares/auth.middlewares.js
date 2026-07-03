import { User } from "../models/user.models.js";
import { ApiErro } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken";

const verifyJwt = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // console.log("acees token get", token);

    if (!token) {
      throw new ApiErro(400, "Unauthorized token", false);
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECREAT);
    // console.log("decoded token ++++++", decodedToken._id);

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken",
    );

    if (!user) {
      throw new ApiErro(401, "Invalid access token ", false);
    }

    req.user = user;
    next();
  } catch (error) {

    // Access token expired
    if (error.name === "TokenExpiredError") {
      throw new ApiErro( 401,"Access token expired. Please refresh token.",false,);
    }

    // Invalid token (modified, fake, wrong secret)
    if (error.name === "JsonWebTokenError") {
      throw new ApiErro(401, "Invalid access token", false);
    }

    throw new ApiErro(401, error?.message || "Invalid access token", false);
  }
});

export { verifyJwt };
