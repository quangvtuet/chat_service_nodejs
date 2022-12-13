import jwt from "jsonwebtoken";

export function generateToken(userModel) {
    return jwt.sign({
        id: userModel._id,
        email: userModel.email,
        userName: userModel.userName,
        image: userModel.image,
        registerTime: userModel.createAt,
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXP * 24 * 60 * 60 * 1000,
    });
}

export function setOptionRes() {
    return {
      expires: new Date(Date.now() + process.env.TOKEN_EXP * 24 * 60 * 60 * 1000)
    };
  }