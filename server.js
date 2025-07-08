// server.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Use body-parser to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sample product suggestions (this can be extended later to a database)
const products = [
  { id: 1, name: "Washing Machine - Model X", category: "Washing Machine", price: 8000 },
  { id: 2, name: "Electric Grinder - Model Y", category: "Grinder", price: 2500 },
  { id: 3, name: "Drill Machine - Model Z", category: "Drill", price: 4500 },
  // Add more products here...
];

// Serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Endpoint to get product suggestions based on user input
app.post('/suggest', (req, res) => {
  const { category, price } = req.body;

  // Find the best match based on category and price
  const suggestedProduct = products.find(product => product.category.toLowerCase() === category.toLowerCase() && product.price <= price);

  if (suggestedProduct) {
    res.json({ suggestion: suggestedProduct });
  } else {
    res.json({ message: "No products found for your request." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
