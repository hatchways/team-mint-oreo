const express = require('express');
const router = express.Router();

const { uploadMintPic, uploadSaltedPic } = require('../aws/aws-utils');

router.post('/', async (req, res) => {
  const pic = await uploadMintPic();
  console.log(pic);
  res.status(201).json({
    success: true,
    pic,
  });
});

router.post('/new', async (req, res) => {
  const { pic } = req.body;
  const awsResult = await uploadSaltedPic(pic);
  console.log('Pic URL', awsResult.Location);
  res.status(201).json({
    success: true,
    pic: awsResult,
  });
});

module.exports = router;
