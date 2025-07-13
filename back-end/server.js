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

// Route to get all donations
app.get("/donations", (req, res) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading donations file:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    try {
      const donations = JSON.parse(data || "[]");
      res.json(donations);
    } catch (parseErr) {
      console.error("Error parsing donations data:", parseErr);
      res.status(500).json({ error: "Error parsing donation data" });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
