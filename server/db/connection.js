const mongoose = require('mongoose');

// Connect to Mongo
const isProduction = process.env.NODE_ENV === 'production';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env[`MONGO_URI${isProduction ? '_PRODUCTION' : ''}`],
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB connected at ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit out of the app with a failure
  }
};

module.exports = connectDB;
