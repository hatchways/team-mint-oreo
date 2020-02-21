const AWS = require('aws-sdk');
const fs = require('fs');

const AWS_ID = process.env.AWS_ID;
const AWS_SECRET = process.env.AWS_SECRET;
AWS.config.update({
  accessKeyId: AWS_ID,
  secretAccessKey: AWS_SECRET,
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

const s3 = new AWS.S3();

const uploadMintPic = () => {
  const fileContent = fs.readFileSync('./aws/mintoreo.png');

  const bucketParams = {
    Bucket: BUCKET_NAME,
    Key: 'mintoreo.png',
    Body: fileContent,
  };

  const s3UploadPromise = new Promise((resolve, reject) => {
    s3.upload(bucketParams, (err, data) => {
      if (err) {
        reject(err);
      }
      if (data) {
        resolve(data);
      }
    });
  });
  return s3UploadPromise;
};

module.exports = {
  uploadMintPic,
};
