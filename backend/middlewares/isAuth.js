// middlewares/isAuth.js
import jwt from 'jsonwebtoken';
import { User } from './../models/User.js';

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Please login to continue",
      });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData) {
      return res.status(401).json({
        message: "Token expired.",
      });
    }

    const user = await User.findById(decodedData.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;   // now req.user is the full user object
    next();
  } catch (error) {
    console.error("isAuth error:", error);
    return res.status(401).json({
      message: "Please login to continue",
    });
  }
};
