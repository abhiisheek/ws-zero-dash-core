import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import secret from "../utils/secret.js";
import { errorHandler } from "../utils/index.js";
import { getUserDetailsById, isUserPresent } from "../helpers/userProfile.js";

const signup = async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const avatarURL = req.body.avatarURL;

  if (!email || !name || !password) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }

  User.find({ email })
    .exec()
    .then(
      async (docs) => {
        if (docs?.length) {
          errorHandler(
            res,
            { message: "User already exists. Please try loging in" },
            400
          );
        } else {
          const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            password,
            avatarURL,
          });

          await newUser.save();

          const token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8,
              data: { name: newUser.name, email: newUser.email },
            },
            secret.key
          );

          res.send(token);
        }
      },
      (err) => {
        errorHandler(res, err);
      }
    );
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }

  User.find({ email, password })
    .select("name email")
    .exec()
    .then(
      (docs) => {
        if (!docs?.length) {
          errorHandler(res, { message: "Login Failed!" }, 400);
        } else {
          const token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8,
              data: docs[0],
            },
            secret.key
          );

          res.send(token);
        }
      },
      (err) => {
        errorHandler(res, err);
      }
    );
};

const changePassword = async (req, res) => {
  const newPassword = req.body.newPassword;
  const oldPassword = req.body.oldPassword;
  const authorization = req.get("Authorization");

  const token = authorization.startsWith("Bearer ") && authorization.slice(7);

  if (!newPassword || !oldPassword) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }

  try {
    const data = jwt.verify(token, secret.key);

    const details = await User.findOne({
      email: data.data.email,
      password: oldPassword,
    }).lean();

    if (!details) {
      errorHandler(res, { message: "User details not matching" }, 400);
      return;
    }

    await User.findOneAndUpdate(
      { email: data.data.email },
      {
        password: newPassword,
      },
      {
        new: true,
      }
    );

    res.send("Success");
  } catch (err) {
    errorHandler(res, err);
  }
};

const getUser = async (req, res) => {
  const userId = req.params["userId"];

  if (!userId) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }

  User.find({ _id: userId })
    .select("name email avatarURL")
    .exec()
    .then(
      (docs) => {
        if (!docs?.length) {
          errorHandler(res, { message: "User not found!" }, 400);
        } else {
          res.send(docs[0]);
        }
      },
      (err) => {
        errorHandler(res, err);
      }
    );
};

const updateUser = async (req, res) => {
  const userId = req.params["userId"];

  const avatarURL = req.body.avatarURL;

  if (!userId) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }

  try {
    const details = await getUserDetailsById(userId);

    const updated = await User.findOneAndUpdate(
      { _id: userId },
      {
        avatarURL: avatarURL || details.avatarURL,
      },
      {
        new: true,
      }
    );

    res.send(updated);
  } catch (err) {
    errorHandler(res, err, 500);
  }
};
export default {
  signup,
  login,
  changePassword,
  getUser,
  updateUser,
};
