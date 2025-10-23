const express = require('express');
const path = require('path');
const routes = require('./routes/index');

const app = express();

// Serve static files from the "static" directory
app.use(express.static(path.join(__dirname, '../static')));

// Set EJS as the view engine and define the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../templates'));

// Use imported routes
app.use('/', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});