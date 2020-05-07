const router = require("express").Router();
const { authentication } = require("./../auth/auth");
const User = require("./user-model");

router.get("/", authentication, async (req, res) => {
  try {
    const user = User.find();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
