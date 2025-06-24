const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Import routes
const todoRoutes = require('./routes/todoRoutes');

// Gunakan route untuk endpoint todo
app.use('/api', todoRoutes);

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
