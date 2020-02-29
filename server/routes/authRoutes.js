const router = require('express').Router();
const bcrypt = require('../services/bcryptService');
const uuidv4 = require('uuid/v4');
const { validateCredentials } = require('../services/validationService');
const db = require('../controllers');
const jwt = require('../services/jwtService');

router.post('/register', async (req, res) => {
  try {
    const { email, password, language, displayName } = req.body;
    validateCredentials(email, password);
    const hashedPassword = await bcrypt.encrypt(password);
    // associate a random invitation uuid to the newly created user
    const inviteCode = uuidv4();
    const { id = null } = await db.user.createUser({
      email,
      password: hashedPassword,
      language,
      displayName,
      avatar: '',
      inviteCode,
    });
    if (id) res.status(201).json({ status: 201 });
  } catch (err) {
    return res.status(err.status).json({
      error: err.message,
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    validateCredentials(email, password);
    const userData = await db.user.getByEmail(email);
    if (!userData) throw new Error(401, 'User not found');
    await bcrypt.checkPassword(password, userData.password);
    const { id } = userData;
    const encodedToken = await jwt.sign({ id });

    res
      .cookie('user', encodedToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 180, // 6months
        // secure: true
        signed: true,
      })
      .json({
        success: true,
        status: 200,
        userData,
      });
  } catch (err) {
    console.error(err);
    return res.status(err.status).json({ error: err.message });
  }
});

router.get('/jwtLogin', async (req, res) => {
  const { userId } = res.locals;
  const dbUser = await db.user.getById(userId);
  if (!dbUser) res.clearCookie('user');
  res.status(200).json({ userId });
});

router.get('/logout', async (req, res) => {
  res
    .clearCookie('user')
    // give some status so HTTPClient doesn't crash on front end
    .status(200)
    .json({ success: true });
});

module.exports = router;
