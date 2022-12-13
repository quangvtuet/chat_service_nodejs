import formidable from "formidable";
import userModel from "../models/userModel.js";
import fs from "fs";
import bcrypt from "bcrypt";
import path from "path";
import { generateToken, setOptionRes } from "../config/genToken.js";
import { validatorUserRegistration, validatorUserLogin } from "../helper/userHelper.js"
const __dirname = path.resolve();

export function userRegister(req, res) {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    const { userName, email, password } = fields;
    validatorUserRegistration(fields, files, res);
    try {
      const checkUser = await userModel.findOne({ email: email });
      console.log(checkUser);
      if (checkUser) {
        res.status(400);
        throw "User already exists";
      }
      const getImageName = files.image.name;
      const randNumber = Math.floor(Math.random() * 99999);
      const newImagename = randNumber + getImageName;
      files.image.name = newImagename;
      const newPath = __dirname + `/client/public/image/${files.image.originalFilename}`;
      fs.copyFile(files.image.filepath, newPath, async (error) => {
        if (!error) {
          const userCreate = await userModel.create({
            userName,
            email,
            password: await bcrypt.hash(password, 10),
            image: newPath,
          });
          const token = generateToken(userCreate);
          const options = setOptionRes();

          res.status(201).cookie("authToken", token, options).json({
            successMessage: "Your Register successfull",
            token,
          });
        } else {
          res.status(404).json({
            error: {
              errorMessage: error,
            },
          });
        }
      });
    } catch (error) {
      res.status(400).json({
        error: {
          errorMessage: error,
        },
      });
    }
  });
}

export async function userLogin(req, res) {
  const { email, password } = req.body;
  validatorUserLogin(email, password, res);
  try {
    const checkUser = await userModel.findOne({
      email: email
    }).select('+password');
    if (checkUser) {
      const matchPassword = await bcrypt.compare(password, checkUser.password);
      if (matchPassword) {
        const token = generateToken(checkUser);
        const options = setOptionRes()
        res.status(200).cookie('authToken', token, options).json({
          successMessage: 'Your login successfull',
          token
        })
      } else {
        res.status(400).json({
          error: {
            errorMessage: ['your password not valid']
          }
        });
      }
    } else {
      res.status(400).json({
        error: {
          errorMessage: ['your email not found']
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: {
        errorMessage: ['Internal server error']
      }
    });
  }
}

export function userLogout(req, res) {
  try {
    res.status(200).cookie('authToken', '').json({
      success: true
    })
  }
  catch (error) {
    res.status(404).json({
      error: {
        errorMessage: ['Internal server error']
      }
    });
  }

}

export async function allUsers(req, res) {
  const keyword = req.query.search
    ? {
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ],
    }
    : {};

  const users = await userModel.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
}