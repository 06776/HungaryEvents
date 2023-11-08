const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Név"],
  },
  email: {
    type: String,
    required: [true, "E-mail"],
  },
  password: {
    type: String,
    required: [true, "Jelszó"],
    minLength: [10, "A jelszónak minimum 10 karakterből kell állnia"],
    select: false,
  },
  role: {
    type: String,
    default: "Admin",
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

adminsSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

adminsSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

adminsSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Admins", adminsSchema);
