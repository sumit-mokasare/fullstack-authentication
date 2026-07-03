import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { User } from "../models/user.models.js";
import { ApiErro } from "../utils/api-error.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { sendMail, emailVerificationMailGenContent } from "../utils/mail.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import axios from "axios";
import jwksClient from "jwks-rsa";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiErro(
      400,
      "Something went wrong while creating access and refresh token",
    );
  }
};

const Register = asyncHandler(async (req, res) => {
  // get data form user
  const { username, email, password } = req.body;
  const avatar = req.file?.path || "";
  // data is valideted in express validetor so no need

  // check is user already exist
  const isExistedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isExistedUser) {
    throw new ApiErro(409, "User with usernam and email is already exist");
  }

  // uplaod avater to cloudinary
  let avatarData;

  if (avatar) {
    const cloudinaryResponse = await uploadOnCloudinary(avatar);
    if (cloudinaryResponse) {
      avatarData = {
        url: cloudinaryResponse.url,
        localpath: cloudinaryResponse.public_id,
      };
    }
  }

  //create user Object - create entry in db
  const user = await User.create({
    username,
    email,
    password,
    avatar: avatarData,
  });
  // remove password and reresh token field from resopnse
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  // check is user created or not

  if (!createdUser) {
    throw new ApiErro(500, "Somthing went wrong while registering a user");
  }

  // generate verification tokens and save in DB
  const { unHashedToken, hashedToken, tokenExpiry } =
    await user.generateTemporaryToken();

  user.verficationToken = hashedToken;
  user.verificationExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  //  generate verification URL
  const verificationUrl = `${process.env.BASE_URL}/api/v1/users/verify/${unHashedToken}`;
  const mailContent = emailVerificationMailGenContent(
    username,
    verificationUrl,
  );

  // send verification Email to user
  await sendMail({
    email: user.email,
    subject: "Verify your email",
    mailgenContent: mailContent,
  });

  // send regitration success response
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        createdUser,
        "User Register Successfully please verify your email address",
        true,
      ),
    );
});

const verifyUser = asyncHandler(async (req, res) => {
  // get token from paramas
  const { token } = req.params;
  xx;
  const hashedToken = await crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // find the user with verification token
  const user = await User.findOne({
    verficationToken: hashedToken,
    verificationExpiry: { $gt: Date.now() },
  });

  // check if not user Exist
  if (!user) {
    throw new ApiErro(400, "Invalid or expired Verification token", false);
  }

  // update user isverify status and remove verficationToken and verificationExpiry

  user.isEmailVerified = true;
  user.verficationToken = undefined;
  user.verificationExpiry = undefined;
  await user.save({ validateBeforeSave: false });

  //  send success response
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User verified Successfully", true));
});

const loginUser = asyncHandler(async (req, res) => {
  // get data user email and pass

  const { email, password } = req.body;
  // console.log(email , password);

  // find user in db throw email

  const user = await User.findOne({ email });

  if (user.authProvider === "google") {
    throw new ApiErro(
      400,
      "“This email is registered with Google. Please use Google login.”",
      false,
    );
  }

  // check is user exist in db
  if (!user) {
    throw new ApiErro(400, "Invalied email", false);
  }

  // check is user verified
  if (!user.isEmailVerified) {
    throw new ApiErro(400, "Pleas verify user email address", false);
  }

  // check is password correct
  const isCorrectPassword = await user.isPasswordCorrect(password);

  if (!isCorrectPassword) {
    throw new ApiErro(400, "Invalied email or password");
  }

  // generate acces token and refreshtoken
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );

  // console.log(accessToken , refreshToken);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        201,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged In successfuly",
        true,
      ),
    );
});

const getProfile = asyncHandler(async (req, res) => {
  // get Id from req.user
  const userId = req.user.id;
  // find user beast on id
  const user = await User.findById(userId).select("-password -refreshToken");
  // check if user is Exist
  if (!user) {
    throw new ApiErro(400, "user Not found", false);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Successfully get user", true));
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    },
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict", // must match
    path: "/", // very important
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  // get token Refreshtoken from FE cookeis
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  // console.log("asdf +++++++", incomingRefreshToken);
  // check token is valid or not
  if (!incomingRefreshToken) {
    throw new ApiErro(401, "Unauthorized Request");
  }

  try {
    // decode token get user Id
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECREAT,
    );

    // find user beast on id
    const user = await User.findById(decodedToken._id);

    if (!user) {
      throw new ApiErro(401, "User not found Invalid Refresh Token", false);
    }

    // check if incomingRefreshToken from FE  and inside user refreshToken are same

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiErro(400, "Refresh token is expired or used", false);
    }

    // generate new access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id,
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    // set in to cookie agin send response
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "access Token refreshed successfully",
          true,
        ),
      );
  } catch (error) {
    console.log("error in refresh accesstoken ==", error.message);
    throw new ApiErro(401, error.message || "Invalid Refresh token ");
  }
}); 

const forgotPassword = asyncHandler(async (req, res) => {
  // get email from body

  const user = await User.findById(req.user._id);
  // check is User exist in db
  if (!user) {
    throw new ApiErro(401, "User not found invalid token", false);
  }

  if (user.provider === "google") {
    throw new ApiError(
      400,
      "This account uses Google Sign-In. Please login with Google.",
      false,
    );
  }

  // hashed token and update in db
  const { unHashedToken, hashedToken, tokenExpiry } =
    await user.generateTemporaryToken();

  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = tokenExpiry;
  user.save({ validateBeforeSave: false });

  // send mail to user
  const forgortPasswordUrl = `${process.env.BASE_URL}/api/v1/users/reset-password/${unHashedToken}`;
  const mailContent = emailVerificationMailGenContent(
    username,
    forgortPasswordUrl,
  );
  await sendMail({
    email: user.email,
    subject: "Verify your email",
    mailgenContent: mailContent,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "forgot password email send please check out Your email",
        true,
      ),
    );
});

const resetPassword = asyncHandler(async (req, res) => {
  // get token from params and password from body
  // console.log("bodyy ++", req.body);

  const unHashedToken = req.params.token;
  const { password } = req.body;
  // console.log("unsHashtoken +++", newPassword);

  const hashedToken = await crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  // find user beast on token
  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  console.log("user get +++", user);

  if (!user) {
    throw new ApiErro(400, "Invalid Or expired token", false);
  }

  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password successfully chenaged", false));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avater = req.file?.path;
  console.log("avater ", avater);

  if (!avater) {
    throw new ApiErro(400, "Avatar file is missing");
  }

  const cloudinaryResponse = await uploadOnCloudinary(avater);

  if (!cloudinaryResponse.url) {
    throw new ApiErro(400, "Error while uploading avatar on cloudinary");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: {
          url: cloudinaryResponse.url,
          localpath: cloudinaryResponse.public_id,
        },
      },
    },
    {
      new: true,
    },
  ).select("-password -refreshToken");

  console.log("userrr +++++++++", user);

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar update successfully", true));
});

const googleLogin = asyncHandler(async (req, res) => {
  const googleURL =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}` +
    `&response_type=code` +
    `&scope=openid%20email%20profile`;

  res.redirect(googleURL);
});

// / 1️⃣ JWKS Client (to verify Google signature)
const client = jwksClient({
  jwksUri: "https://www.googleapis.com/oauth2/v3/certs",
});

// 2️⃣ Get Google Public Key
const getKey = (header, callback) => {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
};

// 3️⃣ Verify Google ID Token
const verifyGoogleToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getKey,
      {
        audience: process.env.GOOGLE_CLIENT_ID,
        issuer: ["https://accounts.google.com", "accounts.google.com"],
      },
      (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
      },
    );
  });
};

const googleCallback = asyncHandler(async (req, res) => {
  const code = req.query.code;
  if (!code) throw new ApiErro(400, "Google auth code missing");

  const googleResponse = await axios.post(
    "https://oauth2.googleapis.com/token",
    {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    },
  );

  const { id_token } = googleResponse.data;
  if (!id_token) throw new ApiErro(401, "Google did not return id_token");

  const googleUser = await verifyGoogleToken(id_token);

  // console.log("google user with is come from google ++++++", googleUser);

  const { email, name, sub, picture } = googleUser;

  let user = await User.findOne({ email });

  if (user && user.authProvider !== "google") {
    throw new ApiErro(
      400,
      "This email was registered using password. Use normal login.",
      false,
    );
  }

  if (user && user.authProvider === "google") {
    // just update googleId if missing (safety)
    if (!user.googleId) {
      user.googleId = sub;
      await user.save();
      return res.status(200).json({
        message: "login huaa",
      });
    }
  }

  if (!user) {
    user = await User.create({
      email,
      username: name.replace(" ", "_"),
      googleId: sub,
      isEmailVerified: true,
      authProvider: "google",
      avatar: {
        url: picture,
        localpath: "",
      },
    });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );

  return res
    .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
    .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
    .redirect("http://127.0.0.1:3000/api/v1/users/profile"); // or send JSON
});

export {
  Register,
  verifyUser,
  loginUser,
  getProfile,
  logoutUser,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  updateUserAvatar,
  googleLogin,
  googleCallback,
};
