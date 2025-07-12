// Etapa 4: Show extra input when "Other" is selected in donation type

import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
export default function App() {
  // Save inputs locally before send to the backend
  const [form, setForm] = useState({
    donorName: "",
    type: "money",
    customType: "",
    amount: "",
    date: "",
  });

  // Update inputs while the user is typing
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // If user selected "other", send customType instead of "other"
    const donationData = {
      ...form,
      type: form.type === "other" ? form.customType : form.type,
    };

    console.log("Donation submitted:", donationData); // Placeholder for backend

    // Clear form after submit
    setForm({
      donorName: "",
      type: "money",
      customType: "",
      amount: "",
      date: "",
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Donation Manager
      </Typography>

      {/*Form*/}
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

        {/* Show extra input when "other" is selected */}
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
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
        />

        <Button variant="contained" type="submit">
          Add Donation
        </Button>
      </Box>
    </Container>
  );
}
