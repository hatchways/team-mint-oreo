const mongoose = require("mongoose");
// require("dotenv").config();

// Connect to Mongo
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        console.log(`MongoDB connected at ${conn.connection.host}`);
    } catch(err) {
        console.error(err);
        process.exit(1);    // Exit out of the app with a failure
    }
};

module.exports = connectDB;
