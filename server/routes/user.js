const express = require("express");
const router = express.Router();

const secret = "some secret";

const passport = require("passport");
const jwt = require("jsonwebtoken");

// Require all models here
const User = require("../models/User");

router.post("/login", (req, res) => {
  // TODO: query DB to ensure that id is correct.
  // const user = new User({
  //     username: req.body.username,
  //     password: req.body.password
  // });

  const payload = {
    id: "1234",
    name: "userName",
    someInfo: "some information is stored here"
  };
  jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
    if (err) res.status(500).json({ error: "Error signing token", raw: err });
    res.json({
      success: true,
      token: `${token}`
    });
  });
});

router.post("/register", async (req, res) => {
    console.log(req.body);
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    try {
        const savedUser = await user.save();
        res.status(200).json({
            success: true,
            user: savedUser
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({
            error: "Server Error"
        });
    }
});

router.get(
  "/path",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({ result: "authenticated" });
  }
);

module.exports = router;
