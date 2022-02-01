const http = require("http");
const app = require("./app");
const cors = require("cors");
const config = require("./utils/config");
const mongoose = require("mongoose");

const mongoUrl = config.mongo;
mongoose.connect(mongoUrl);

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
