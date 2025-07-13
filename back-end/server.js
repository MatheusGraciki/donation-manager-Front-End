const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

// Middleware to parse JSON and allow frontend requests
app.use(cors());
app.use(express.json());

// Path to the donations data file
const dataPath = path.join(__dirname, "donations.json");

// If donations.json doesn't exist, create it with an empty array
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify([]), "utf8");
}

// Basic endpoint to test the server
app.get("/", (req, res) => {
  res.send("Donation backend is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
