// server.js
// Part 1–4: Express server with full CRUD for donations using JSON file

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "donations.json");

// Ensure the JSON file exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Helper to read data from JSON file
function readDonations() {
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
}

// Helper to write data to JSON file
function writeDonations(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET all donations
app.get("/donations", (req, res) => {
  const donations = readDonations();
  res.json(donations);
});

// POST a new donation
app.post("/donations", (req, res) => {
  const donation = { id: uuidv4(), ...req.body };
  const donations = readDonations();
  donations.push(donation);
  writeDonations(donations);
  res.status(201).json(donation);
});

// PUT (update) a donation by ID
app.put("/donations/:id", (req, res) => {
  const { id } = req.params;
  const donations = readDonations();
  const index = donations.findIndex((d) => d.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Donation not found" });
  }

  donations[index] = { ...donations[index], ...req.body };
  writeDonations(donations);
  res.json(donations[index]);
});

// DELETE a donation by ID
app.delete("/donations/:id", (req, res) => {
  const { id } = req.params;
  const donations = readDonations();
  const filtered = donations.filter((d) => d.id !== id);

  if (donations.length === filtered.length) {
    return res.status(404).json({ error: "Donation not found" });
  }

  writeDonations(filtered);
  res.status(204).send(); // No content
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
