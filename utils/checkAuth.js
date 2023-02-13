import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decode = jwt.verify(token, "secret123");
      req.userId = decode._id;
      next();
    } catch {
      return res.status(403).json({ message: "Нет доступа" });
    }
  } else {
    return res.status(403).json({ message: "Нет доступа" });
  }
};

export default checkAuth;
