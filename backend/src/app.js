import expess from "express";
import authRounter from "../src/routes/auth.routes.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = expess();

dotenv.config({
  path: "./.env",
});

app.use(expess.json());
app.use(expess.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE", "OPTION"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

const errorHandler = (err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
};
app.use("/api/v1/users", authRounter);
app.use(errorHandler);

export default app;
