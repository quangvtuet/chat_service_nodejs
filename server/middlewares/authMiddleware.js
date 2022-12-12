import jwt from "jsonwebtoken";
import User from "../models/userModel.js"
import asyncHandler from "express-async-handler";


export async function authMiddleware(req, res, next) {
    const { authToken } = req.cookies;
    if (authToken) {

        const deCodeToken = await jwt.verify(authToken, process.env.SECRET);
        req.myId = deCodeToken.id;
        next();
    } else {
        res.status(400).json({ error: { errorMessage: ['please login'] } });
    }
}

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
