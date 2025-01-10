import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3001 });

let gridState = Array.from({ length: 10 }, () => Array(10).fill(""));
let onlinePlayers = 0;

// Broadcast a message to all connected clients
const broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on("connection", (ws) => {
  onlinePlayers++;
  console.log("New client connected. Total players:", onlinePlayers);

  // Send the current grid state and player count to the newly connected client
  ws.send(JSON.stringify({ type: "gridUpdate", grid: gridState }));
  ws.send(JSON.stringify({ type: "playerCount", count: onlinePlayers }));

  // Notify all clients about the updated player count
  broadcast({ type: "playerCount", count: onlinePlayers });

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "updateCell") {
      const { row, col, char } = data;
      if (gridState[row][col] === "") {
        gridState[row][col] = char;

        // Broadcast the updated grid to all clients
        broadcast({ type: "gridUpdate", grid: gridState });
      }
    }
  });

  ws.on("close", () => {
    onlinePlayers--;
    console.log("Client disconnected. Total players:", onlinePlayers);

    // Notify all clients about the updated player count
    broadcast({ type: "playerCount", count: onlinePlayers });
  });
});
