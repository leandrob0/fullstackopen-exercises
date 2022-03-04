const http = require("http");
const app = require("./app");
const config = require("./utils/config");
const connectDb = require("./utils/mongo");

connectDb();

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
