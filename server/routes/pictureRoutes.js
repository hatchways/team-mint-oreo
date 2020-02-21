const express = require('express');
const router = express.Router();

const { uploadMintPic } = require('../aws/aws-utils');

router.post('/', async (req, res) => {
  const pic = await uploadMintPic();
  console.log(pic);
  res.status(201).json({
    success: true,
    pic,
  });
});

module.exports = router;
