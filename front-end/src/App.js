import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Box,
  Button,
  Paper,
  IconButton,
  Stack,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

export default function App() {
  // Save inputs locally before sending to the backend
  const [form, setForm] = useState({
    donorName: "",
    type: "money",
    customType: "",
    amount: "",
    date: "",
  });

  // Store fetched donations from backend
  const [donations, setDonations] = useState([]);

  // Track which donation is being edited
  const [editingId, setEditingId] = useState(null);

  // Fetch existing donations from backend
  useEffect(() => {
    fetch("http://localhost:3001/donations")
      .then((res) => res.json())
      .then((data) => setDonations(data))
      .catch((err) => console.error("Error loading donations:", err));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Reset form and editing state
  const resetForm = () => {
    setForm({
      donorName: "",
      type: "money",
      customType: "",
      amount: "",
      date: "",
    });
    setEditingId(null);
  };

  // Submit donation to backend (create or update)
  const handleSubmit = (e) => {
    e.preventDefault();

    const donationData = {
      ...form,
      type: form.type === "other" ? form.customType : form.type,
    };

    if (editingId) {
      // Edit existing donation
      fetch(`http://localhost:3001/donations/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
      })
        .then((res) => res.json())
        .then((updatedDonation) => {
          setDonations((prev) =>
            prev.map((d) => (d.id === editingId ? updatedDonation : d))
          );
          resetForm();
        })
        .catch((err) => console.error("Error updating donation:", err));
    } else {
      // Create new donation
      fetch("http://localhost:3001/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
      })
        .then((res) => res.json())
        .then((newDonation) => {
          setDonations((prev) => [...prev, newDonation]);
          resetForm();
        })
        .catch((err) => console.error("Error saving donation:", err));
    }
  };

  // Load donation data into form for editing
  const handleEdit = (donation) => {
    setForm({
      donorName: donation.donorName,
      type: ["money", "food", "clothing"].includes(donation.type)
        ? donation.type
        : "other",
      customType: ["money", "food", "clothing"].includes(donation.type)
        ? ""
        : donation.type,
      amount: donation.amount,
      date: donation.date,
    });
    setEditingId(donation.id);
  };

  // Format date to dd/mm/yyyy
  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
  };

  // Delete donation
  const handleDelete = (id) => {
    fetch(`http://localhost:3001/donations/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setDonations((prev) => prev.filter((d) => d.id !== id));
        if (editingId === id) resetForm();
      })
      .catch((err) => console.error("Error deleting donation:", err));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Donation Manager
      </Typography>

      {/* Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          name="donorName"
          label="Donor's Name"
          value={form.donorName}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          select
          name="type"
          label="Donation Type"
          value={form.type}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="money">Money</MenuItem>
          <MenuItem value="food">Food</MenuItem>
          <MenuItem value="clothing">Clothing</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>

        {form.type === "other" && (
          <TextField
            name="customType"
            label="Describe Donation Type"
            value={form.customType}
            onChange={handleChange}
            required
            fullWidth
          />
        )}

        <TextField
          name="amount"
          type="number"
          label="Amount or Quantity"
          value={form.amount}
          onChange={handleChange}
          slotProps={{ inputLabel: { shrink: true } }}
          fullWidth
        />

        <TextField
          name="date"
          type="date"
          label="Date"
          value={form.date}
          onChange={handleChange}
          slotProps={{ inputLabel: { shrink: true } }}
          required
          fullWidth
        />

        <Button variant="contained" type="submit">
          {editingId ? "Update Donation" : "Add Donation"}
        </Button>
        {editingId && (
          <Button variant="outlined" onClick={resetForm}>
            Cancel Edit
          </Button>
        )}
      </Box>

      {/* Donations List */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Donations List
      </Typography>

      <Stack spacing={2}>
        {donations.map((donation) => (
          <Paper key={donation.id} sx={{ p: 2 }}>
            <Typography>
              <strong>{donation.donorName}</strong> donated US$
              <strong>{donation.amount}</strong> ({donation.type}) on
              <strong> {formatDate(donation.date)}</strong>
            </Typography>
            <Box>
              <IconButton onClick={() => handleDelete(donation.id)} color="error">
                <Delete />
              </IconButton>
              <IconButton onClick={() => handleEdit(donation)} color="primary">
                <Edit />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}
