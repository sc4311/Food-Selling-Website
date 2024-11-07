import fs from 'node:fs/promises';
import bodyParser from 'body-parser';
import express from 'express';
import mysql from 'mysql2';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const conn = mysql.createConnection({
  host: 'scrumpy-foods.cj0cmagoo0l5.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'scrumpyfoods2024!'
})

app.get('/meals', async (req, res) => {
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');
  res.json(JSON.parse(meals));
});

app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  if (orderData === null || orderData.items === null || orderData.items.length === 0) {
    return res
      .status(400)
      .json({ message: 'Missing data.' });
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

app.post('/api/auth/signin', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.'});
  }

  conn.query('SELECT acc_id FROM accounts WHERE acc_username = ? LIMIT 1', [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error.' });
    }

    if (results.length === 0) {
      const role = 'user';
      conn.query(
        'INSERT INTO accounts (acc_username, acc_password, role) VALUES (?, ?, ?)',
        [username, password, role],
        (err) => {
          if (err) {
            return res.status(500).json({ message: 'Failed to create account.' });
          }
          res.status(201).json({ message: 'Account created successfully.' });
        }
      );
    } else {
      res.status(200).json({ message: 'User signed in successfully.' });
    }
  });
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000);
