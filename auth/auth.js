const bcrypt = require("bcrypt");
const User = require("../users/user-model");

exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const user = await User.create({
      ...req.body,
      password: hash,
    });
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "An error occurred." });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.query().where({ email }).first();
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      next();
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred." });
  }
};

exports.authentication = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(403).json({ message: "Access forbidden." });
  }
};
