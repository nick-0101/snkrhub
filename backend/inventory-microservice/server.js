const express = require('express');
const app = express();

// Routes
var properties = require('./package.json');
app.get('/about', (req, res) => {
  var aboutInfo = {
    name: properties.name,
    version: properties.version,
  };
  res.json(aboutInfo);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`⚡️ [server]: Server is running on http://localhost:${PORT}`)
);
