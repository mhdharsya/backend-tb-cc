const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Import routes
const todoRoutes = require('./routes/todoRoutes');

// Gunakan route untuk endpoint todo
app.use('/api', todoRoutes);

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
