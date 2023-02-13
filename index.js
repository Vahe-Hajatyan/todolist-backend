import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {
  listValidator,
  registerValidator,
  loginValidator,
} from "./validator.js";
import handleError from "./utils/handleError.js";
import {
  deleteList,
  getList,
  setList,
  updateList,
} from "./controller/listController.js";
import { register, login, findMe } from "./controller/userController.js";
import checkAuth from "./utils/checkAuth.js";

const app = express();

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://admin:janvahejan@cluster0.aqoyjte.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

app.use(cors());
app.use(express.json());

app.post("/auth/register", registerValidator, handleError, register);
app.post("/auth/login", loginValidator, handleError, login);
app.get("/auth/me", checkAuth, findMe);

app.post("/list", checkAuth, listValidator, handleError, setList);
app.get("/list", checkAuth, getList);
app.patch("/list/:id", updateList);
app.delete("/list/:id", deleteList);

app.listen(3333, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("server ok");
});
