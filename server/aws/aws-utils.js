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

const S3Upload = bucketParams => {
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
const uploadMintPic = () => {
  const fileContent = fs.readFileSync('./aws/mintoreo.png');

  const bucketParams = {
    Bucket: BUCKET_NAME,
    Key: 'mintoreo.png',
    Body: fileContent,
  };

  return S3Upload(bucketParams);
};

/**
 * Uploads a picture S3.
 *
 * Salts the name of the picture to make it unique, then upload.
 * @param {Object} pic      Object containing picture data.
 * @param {String} pic.name the picture's name
 * @param {String} pic.data the picture's name
 *
 * @return {Promise} Returns a Promise that returns the location of the file on success.
 */
const uploadSaltedPic = pic => {
  const { data, name } = pic;
  const randomName = Math.floor(Math.random() * Math.floor(1000)) + Date.now() + name;
  const saltedName = hashCode(randomName);

  // data is in base64 string representation of an image, need to convert
  // need to cut off the first 21 positions
  const imageBody = data.substring(22);

  const buf = Buffer(imageBody, 'base64');

  const ending = name.substring(name.length - 4);
  const cleanName = name.substring(0, name.length - 4);
  const bucketParams = {
    Bucket: BUCKET_NAME,
    Key: `${cleanName}${saltedName}${ending}`,
    Body: buf,
    ContentType: 'image/x-png',
  };

  return S3Upload(bucketParams);
};

/**
 * Returns a hash code for a string.
 * (Compatible to Java's String.hashCode())
 *
 * The hash code for a string object is computed as
 *     s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
 * using number arithmetic, where s[i] is the i th character
 * of the given string, n is the length of the string,
 * and ^ indicates exponentiation.
 * (The hash value of the empty string is zero.)
 *
 * @param {string} s a string
 * @return {number} a hash code value for the given string.
 */
const hashCode = s => {
  let h;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;

  return h;
};

const S3Delete = bucketParams => {
  const s3DeletePromise = new Promise((resolve, reject) => {
    console.log('Deleting:', bucketParams.Key);
    s3.deleteObject(bucketParams, (err, data) => {
      if (err) {
        reject(err);
      }
      if (data) {
        resolve(data);
      }
    });
  });
  return s3DeletePromise;
};

const deletePic = picName => {
  const bucketParams = {
    Bucket: BUCKET_NAME,
    Key: picName,
  };

  return S3Delete(bucketParams);
};
module.exports = {
  uploadMintPic,
  uploadSaltedPic,
  deletePic,
};
