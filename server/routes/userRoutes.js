const express = require('express');
const bcrypt = require('../services/bcryptService');
const userController = require('../controllers/UserController');

const router = express.Router();

router.post('/register', async (req, res) => {
  console.log(req.body);
  try {
    const { id } = await userController.createUser(req.body);
    res
      .status(201)
      .cookie('user', id, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 180, // 180days
        // secure: true
        signed: true,
      })
      .redirect(301, '/messages');
  } catch (err) {
    console.error(err);
    // insert error handling here
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw Error({ code: 401 });
    const userData = await userController.getUserByEmail(email);
    const match = await bcrypt.checkPassword(password, userData.password);
    if (!match) throw new Error({ code: 403 });

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

router.get('/test', async (req, res) => {
  res.status(301).redirect('/messages');
});

module.exports = router;
