const mongoose = require('mongoose');

// Connect to Mongo
const connectDB = async () => {
  try {
    const connectionURI =
      process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;
    const conn = await mongoose.connect(connectionURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected at ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit out of the app with a failure
  }
};

module.exports = connectDB;
