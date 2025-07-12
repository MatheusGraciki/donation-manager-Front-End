// Etapa 2: Form controlado - só inputs com useState para o formulário

import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default function App() {
  // Save inputs locally before send to the backend
  const [form, setForm] = useState({ donorName: "" });

  // Update inputs while the user is typing
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Donation Manager
      </Typography>

      {/*Form*/}
      <Box component="form" sx={{ mt: 3 }}>
        <TextField
          name="donorName"
          label="Donor's Name"
          value={form.donorName}
          onChange={handleChange}
          required
          fullWidth
        />
      </Box>
    </Container>
  );
}
