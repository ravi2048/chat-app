const User = require('../models/userModel');
const bcrypt = require('bcrypt');
module.exports = {
    registerUser: async(req, res, next) => {
        try {
            const { username, email, password } = req.body;
            const usernameCheck = await User.findOne({ username });
            if (usernameCheck)
              return res.json({ msg: "Username already exists", status: "ERROR" });
            const emailCheck = await User.findOne({ email });
            if (emailCheck)
              return res.json({ msg: "Email already exists", status: "ERROR" });
            const hashedPassword = await bcrypt.hash(password, 10);
            const responseObj = await User.create({
              email,
              username,
              password: hashedPassword,
            });
            responseObj.password = "hidden, can not be shown";
            return res.json({ status: "SUCCESS", responseObj });
          } catch (ex) {
            next(ex);
          }
    },

    loginUser: async(req, res, next) => {
        try {
            const { username, password } = req.body;
            const responseObj = await User.findOne({ username });
            // console.log(`login user from db:${responseObj}`)
            if (!responseObj)
              return res.json({ msg: "Invalid Username", status: "ERROR" });
            const isPasswordValid = await bcrypt.compare(password, responseObj.password);
            if (!isPasswordValid)
              return res.json({ msg: "Invalid Password", status: "ERROR" });
            responseObj.password = "hidden, can not be shown";
            return res.json({ status: "SUCCESS", responseObj });
          } catch (ex) {
            next(ex);
          }
    },

    getAllUsers: async(req, res, next) => {
        try {
            const responseObj = await User.find({ _id: { $ne: req.params.id } }).select([
              "email",
              "username",
              "avatarImg",
              "_id",
            ]);
            return res.json(responseObj);
          } catch (ex) {
            next(ex);
          }
    }
}
