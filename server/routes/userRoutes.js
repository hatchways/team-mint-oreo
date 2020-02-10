const express = require('express');
const router = express.Router();

const userController = require('../db/Controllers/UserController');

// Require all models here

router.post('/register', async (req, res) => {
  console.log(req.body);
  try {
    await userController.createUser(req.body);
    res.json(req.body);
  } catch (err) {
    console.error(err);
    // insert error handling here
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw Error({ code: 401 });
    const userData = await userController.USER_LOGIN(email, password); // TODO: replace method
    const { _id: id } = userData;

    res
      .status(201)
      .cookie('user', id, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 180,
        // secure: true
        signed: true,
      })
      .redirect(301, '/messages');
  } catch (err) {
    res.sendStatus(err.code);
  }
});

module.exports = router;
