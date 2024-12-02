const { WebSocketServer } = require("ws");
const http = require("http");

const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 3000;

server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

// Game state
const connections = {};
const games = {};

// Helper functions
const guid = () =>
  [1, 1, 1, 1].map(() => Math.random().toString(16).slice(2, 6)).join("-");

const initializeAmmo = () => {
  const realBullets  = Math.floor(Math.random() * 7);
  const ammo = Array(realBullets).fill("real").concat(Array(6-realBullets).fill("fake"));
  console.log("Ammo List : " + ammo)
  return ammo.sort(() => Math.random() - 0.5);
};

// Handle game creation
const createGame = (roomId) => {
  games[roomId] = {
    players: [],
    turnIndex: 0,
    ammo: initializeAmmo(),
    started: false,
  };
};

// Broadcast game state
const broadcastGame = (roomId) => {
  const game = games[roomId];
  game.players.forEach((player) => {
    const connection = connections[player.id];
    connection.send(JSON.stringify({ game }));
  });
};

// WebSocket connection
wsServer.on("connection", (connection, request) => {
  const params = new URLSearchParams(request.url.split("?")[1]);
  const username = params.get("username");
  const roomId = params.get("room") || "default";
  const playerId = guid();

  console.log("Username : " + username + " is attempting to join room " + roomId);

  if (!games[roomId]) createGame(roomId);

  const game = games[roomId];

  // Check if username already exists
  if (game.players.find((player) => player.username === username)) {
    console.log("Username already exists: " + username);
    connection.send(JSON.stringify({ error: "Username already exists in the room." }));
    connection.close();
    return;
  }

  // Check if the room is full
  if (game.players.length >= 4) {
    console.log("Room is full: " + roomId);
    connection.send(JSON.stringify({ error: "The room is full." }));
    connection.close();
    return;
  }

  const newPlayer = { id: playerId, username, lives: 3 };
  game.players.push(newPlayer);
  connections[playerId] = connection;

  game.started =  game.players.length >= 2 ? true  : false;
  console.log(game);

  broadcastGame(roomId);

  connection.on("message", (message) => {
    const data = JSON.parse(message);
    if (data.action === "shoot") {
      handleShoot(game, data.shooterId, data.targetId);
      broadcastGame(roomId);
    }
  });

  connection.on("close", () => {
    game.players = game.players.filter((player) => player.id !== playerId);
    console.log("Player " + username + " has left room " + roomId);
    delete connections[playerId];
    broadcastGame(roomId);
  });
});


// Shooting logic
const handleShoot = (game, shooterId, targetId) => {
  const target = game.players.find((player) => player.id === targetId);

  console.log("Ammo : " + game.ammo)
  
  if (game.ammo[0] === "real") {
    console.log("Ammo Is Real, " + shooterId + " Shoot " + target.username )
    target.lives -= 1;
  }
  else{
    console.log("Ammo Is Fake, " + target.username + " Survive")
  }
  game.ammo.shift(); // Remove used bullet

  if (game.ammo.length === 0) {
    console.log("Ammo is empty. Reinitializing...");
    game.ammo = initializeAmmo();
  }
  
  if (target.lives <= 0) {
    console.log(`${target.username} is eliminated!`);
  }

  game.turnIndex = (game.turnIndex + 1) % game.players.length;
};
