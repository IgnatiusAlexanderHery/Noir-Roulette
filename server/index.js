const { WebSocketServer } = require("ws");
const http = require("http");

const server = http.createServer();
const wsServer = new WebSocketServer({ server });

const port = 3000;

server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

const connections = {};
const users = {};

const handleMessage = (bytes, uuid) => {
  const message = JSON.parse(bytes.toString());
  if (message.username) console.log(`${message.username} connected`);
  const user = users[uuid];
  user.state = message;
  broadcast();

  console.log(`${user.username} updated their updated state: ${JSON.stringify(user.state)}`);
};

const handleClose = (uuid) => {
  console.log(`${users[uuid].username} disconnected`);
  delete connections[uuid];
  delete users[uuid];
  broadcast();
};

const broadcast = () => {
  Object.keys(connections).forEach((uuid) => {
    const connection = connections[uuid];
    const message = JSON.stringify(users);
    connection.send(message);
  });
};

wsServer.on("connection", (connection, request) => {
  const queryString = request.url.split("?")[1];

  console.log(queryString);
  // Split query string into key-value pairs
  const params = new URLSearchParams(queryString);
  console.log(params);
  console.log(params.get("username"));
  // Get the username from the query parameters
  const username = params.get("username");
  console.log(`${username} connected`);
  const uuid = guid();
  connections[uuid] = connection;
  users[uuid] = {
    username,
    state: {},
  };
  connection.on("message", (message) => handleMessage(message, uuid));
  connection.on("close", () => handleClose(uuid));
});

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

// then to call it, plus stitch in '4' in the third group
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
