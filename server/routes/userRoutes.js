const express = require('express');
const bcrypt = require('../services/bcryptService');
const userController = require('../controllers/UserController');
const jwt = require('../services/jwtService');

const router = express.Router();

router.post('/register', async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.encrypt(password);
  try {
    const { id } = await userController.createUser({ email, password: hashedPassword });
    console.log(id);
    if (id) res.sendStatus(201);
  } catch (err) {
    console.error(err);
    // insert error handling here
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw Error(401);
    const userData = await userController.getByEmail(email);
    const match = await bcrypt.checkPassword(password, userData.password);
    if (!match) throw Error(403);
    console.log(userData);
    const { _id: id } = userData;
    const encodedToken = await jwt.sign({ id });

    res
      .cookie('user', encodedToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 180,
        // secure: true
        signed: true,
      })
      .sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
});

router.get('/test', async (req, res) => {
  console.log('hello');
  res.redirect('http://localhost:3000/dashboard');
});

module.exports = router;
