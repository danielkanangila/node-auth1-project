const router = require("express").Router();
const auth = require("./auth");

router.post("/signup", auth.signup, (req, res) => {
  res.status(201).json(req.user);
});

router.post("/login", auth.login, (req, res) => {
  res.json({ message: `Successful login as ${req.session.user.email}.` });
});

router.get("logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).json({ message: "You cannot logout." });
      } else {
        res.json({ message: "Logout successful." });
      }
    });
  }
});

module.exports = router;
