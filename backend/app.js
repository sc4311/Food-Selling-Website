import fs from 'node:fs/promises';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

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

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000);
