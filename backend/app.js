<<<<<<< HEAD
import fs from 'node:fs/promises'; // Remove if you're not using file reading anymore
import mysql from 'mysql2'; // Import MySQL package
=======
import fs from 'node:fs/promises';
>>>>>>> bfabbd0b38a3888bdf87bb2f3bf8e04e542b710d
import bodyParser from 'body-parser';
import express from 'express';

const app = express();

// Database connection setup
const db = mysql.createConnection({
  host: 'scrumpy-foods.cj0cmagoo0l5.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'scrumpyfoods2024!',
  database: 'scrumpyfoods',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database.');
  }
});

app.use(bodyParser.json());
app.use(express.static('public'));

// CORS setup
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// /meals route modified to fetch from MySQL database
app.get('/meals', (req, res) => {
  const query = `
    SELECT appetizer_id AS id, appetizer_name AS name, appetizer_price AS price, appetizer_description AS description, appetizer_image AS image FROM appetizers
    UNION ALL
    SELECT main_id AS id, main_name AS name, main_price AS price, main_description AS description, main_image AS image FROM main_courses
    UNION ALL
    SELECT dessert_id AS id, dessert_name AS name, dessert_price AS price, dessert_description AS description, dessert_image AS image FROM desserts
    UNION ALL
    SELECT drink_id AS id, drink_name AS name, drink_price AS price, drink_description AS description, drink_image AS image FROM drinks
    UNION ALL
    SELECT salad_id AS id, salad_name AS name, salad_price AS price, salad_description AS description, salad_image AS image FROM salads
    UNION ALL
    SELECT side_id AS id, side_name AS name, side_price AS price, side_description AS description, side_image AS image FROM sides;
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Database query error:', error);  // Log the error here for debugging
      return res.status(500).json({ error: 'Failed to fetch meals' });
    }
    res.json(results);  // Send the results to the client
  });
});

// /orders route remains the same
app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  if (orderData === null || orderData.items === null || orderData.items.length === 0) {
    return res.status(400).json({ message: 'Missing data.' });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes('@') ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === '' ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === '' ||
    orderData.customer['postal-code'] === null ||
    orderData.customer['postal-code'].trim() === '' ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing data: Email, name, street, postal code or city is missing.',
    });
  }

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };
  const orders = await fs.readFile('./data/orders.json', 'utf8');
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
  res.status(201).json({ message: 'Order created!' });
});

<<<<<<< HEAD
// 404 handler
=======
app.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const accountsData = await fs.readFile('./data/accounts.json', 'utf8');
    const accounts = JSON.parse(accountsData);

    const user = accounts.find((account) => account.email === email);

    if (user) {
      res.status(200).json({
        message: 'User found, logged in successfully.',
        user: { email: user.email, name: user.name, street: user.street, postalCode: user.postalCode, city: user.city }
      });
    } else {
      res.status (401).json({ message: 'Invalid email or password.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
    console.error(error);
  }
});

app.post('/api/auth/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const accountsData = await fs.readFile('./data/accounts.json', 'utf8');
    const accounts = JSON.parse(accountsData);

    const userExists = accounts.some((account) => account.email === email);

    if (userExists) {
      res.status(409).json({ message: 'User already exists.' });
    } else {
      const newUser = { email, password, name: '', street: '', postalCode: '', city: '' };
      accounts.push(newUser);

      await fs.writeFile('./data/accounts.json', JSON.stringify(accounts));

      res.status(201).json({ message: 'Account created successfully.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
    console.error(error);
  }
})

app.post('/api/auth/update', async (req, res) => {
  const { email, name, street, postalCode, city } = req.body;
  console.log("Update request recieved for:", email);

  try {
    const accountsData = await fs.readFile('./data/accounts.json', 'utf8');
    const accounts = JSON.parse(accountsData);

    const userIndex = accounts.findIndex((acc) => acc.email === email);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update user information
    accounts[userIndex] = { ...accounts[userIndex], name, street, postalCode, city };
    await fs.writeFile('./data/accounts.json', JSON.stringify(accounts, null, 2));
    res.status(200).json({ message: 'User updated successfully.' });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: 'Server error while updating user.' });
  }
});

>>>>>>> bfabbd0b38a3888bdf87bb2f3bf8e04e542b710d
app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

