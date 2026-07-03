import expess from "express";
import authRounter from "../src/routes/auth.routes.js";
import cors from "cors";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

const app = expess();

dotenv.config({
  path:"./.env"
})

app.use(expess.json());
app.use(expess.urlencoded({extended:true}));
app.use(cookieParser())

app.use(
  cors({
    origin:"*",
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE", "OPTION"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);


app.use("/api/v1/users", authRounter);

export default app;
