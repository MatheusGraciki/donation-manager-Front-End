const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, "donations.json");

// if donations.json does not exist, create a void array
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify([]), "utf8");
}

// GET /donations
app.get("/donations", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
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

// POST /donations
app.post("/donations", (req, res) => {
  const { donorName, type, amount, date } = req.body;

  // Basic validation (could be extended later)
  if (!donorName || !type || !amount || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newDonation = {
    id: Date.now(),
    donorName,
    type,
    amount,
    date,
  };


  // Read → append → write
  fs.readFile(dataPath, "utf8", (readErr, data) => {
    if (readErr) {
      console.error("Error reading donations file:", readErr);
      return res.status(500).json({ error: "Could not read donations file" });
    }

    let donations = [];
    try {
      donations = JSON.parse(data || "[]");
    } catch (parseErr) {
      console.error("Error parsing donations:", parseErr);
      return res.status(500).json({ error: "Invalid donations data" });
    }

    donations.push(newDonation);

    fs.writeFile(dataPath, JSON.stringify(donations, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing donations file:", writeErr);
        return res.status(500).json({ error: "Could not save donation" });
      }
      res.status(201).json(newDonation);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
