import userModel from "../model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    let Password = req.body.password;
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(Password, salt);
    const doc = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      { expiresIn: "30d" }
    );
    const { password, ...userData } = user._doc;
    res.json({ userData, token });
  } catch (err) {
    res.status(500).json({
      message: "Не удалось зарегистрироваться",
    });
  }
};
export const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }
    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.password
    );
    if (!isValidPass) {
      return res.status(400).json({
        message: "Неверный логин или пароль",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      { expiresIn: "30d" }
    );
    const { password, ...userData } = user._doc;
    res.json({ userData, token });
  } catch (err) {
    res.status(500).json({
      message: "Не удалось авторизоваться",
      err,
    });
  }
};
export const findMe = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }
    const { password, ...userData } = user._doc;
    res.json(userData);
  } catch (err) {
    res.status(500).json({
      message: "Нет доступа",
      err,
    });
  }
};
