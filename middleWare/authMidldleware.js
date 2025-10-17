import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

    //   console.log(token);

      const decodedToken = jwt.verify(token, "usermg123456");

      req.user = await User.findById(decodedToken.id);

      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }

      console.log(req.user)

      next();
    } else {
      res.status(401).json({ message: "Not authorized, not token" });
    }
  } catch (error) {
    res.status(401).json({ message: "Not authorized, not token" });
  }
};

export const admin = (req,res, next) => {
try {

  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as admin" });
  }
} catch (error) {
   res.status(500).json({ error: error.message });
}
};
