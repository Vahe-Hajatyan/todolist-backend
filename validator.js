import { body } from "express-validator";

export const listValidator = [
  body("text", "no text").isString(),
  body("done", "no done").isBoolean(),
];

export const registerValidator = [
  body("email", "Не верный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
  body("name", "Имя должен быть минимум 3 символов").isLength({ min: 3 }),
];
export const loginValidator = [
  body("email", "Не верный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
];
