const mongoose = require("mongoose");
const config = require("./config");

const connectDb = async () => {
  try {
    await mongoose.connect(config.mongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the db");
  } catch (err) {
    console.log("Error on mongo connection");
  }
};

module.exports = connectDb;
