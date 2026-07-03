import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
// load .env from server folder
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is runing on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongodb connection error", error);
    process.exit(1);
  });
