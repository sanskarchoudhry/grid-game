import { Server } from "socket.io";

const io = new Server(3001, {
  cors: {
    origin: "http://localhost:3000", // Allow your Next.js app to connect
    methods: ["GET", "POST"],
  },
});

let gridState = Array.from({ length: 10 }, () => Array(10).fill(""));

io.on("connection", (socket) => {
  console.log("New client connected");

  // Send the current grid state to the newly connected client
  socket.emit("gridUpdate", gridState);

  // Handle cell updates
  socket.on("updateCell", ({ row, col, char }) => {
    if (gridState[row][col] === "") {
      gridState[row][col] = char;

      // Broadcast the updated grid to all clients
      io.emit("gridUpdate", gridState);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
