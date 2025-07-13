import React, { useState } from "react";
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
  // Save inputs locally before send to backend
  const [form, setForm] = useState({
    donorName: "",
    type: "money",
    customType: "",
    amount: "",
    date: "",
  });

  // Temporarily store submitted donations (will later be stored in backend)
  const [donations, setDonations] = useState([]);

  // Update form inputs as user types
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // If user selected "other", use the customType field instead
    const donationData = {
      ...form,
      type: form.type === "other" ? form.customType : form.type,
    };

    // Add donation to list (will replace with backend call later)
    setDonations([...donations, donationData]);

    // Clear form
    setForm({
      donorName: "",
      type: "money",
      customType: "",
      amount: "",
      date: "",
    });
  };

  // Format date from 'yyyy-mm-dd' to 'dd/mm/yyyy'
  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
  };

  // Handle deleting a donation
  const handleDelete = (index) => {
    const updated = donations.filter((_, i) => i !== index);
    setDonations(updated);
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

        {/* Show custom type input if "other" is selected */}
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
          Add Donation
        </Button>
      </Box>

      {/* Donation List */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Donations List
      </Typography>

      <Stack spacing={2}>
        {donations.map((donation, index) => (
          <Paper key={index} sx={{ p: 2 }}>
            <Typography>
              <strong>{donation.donorName}</strong> donated{" US$ "}
              <strong>{donation.amount}</strong> ({donation.type}) on{" "}
              <strong>{formatDate(donation.date)}</strong>
            </Typography>
            <Box>
              <IconButton onClick={() => handleDelete(index)} color="error">
                <Delete />
              </IconButton>
              <IconButton disabled>
                <Edit />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}
