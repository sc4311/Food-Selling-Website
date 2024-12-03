import express from 'express';
import mysql from 'mysql2'; // Remove if you're not using file reading anymore
import bodyParser from 'body-parser';
import moment from 'moment';

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
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
app.post('/orders', (req, res) => {
  const { order } = req.body;
  const currentDate = moment().format('YYYY-MM-DD');
  
  if (!order) {
    return res.status(400).json({ message: 'Invalid order data.' });
  }
  const { items, customer, user } = order;
  if (
    !customer.name || !customer.name.trim() ||
    !customer.email || !customer.email.includes('@') ||
    !customer.street || !customer.street.trim() ||
    !customer['postal-code'] || !customer['postal-code'].trim() ||
    !customer.city || !customer.city.trim()
  ) {
    return res.status(400).json({
      message: 'Missing data: Name, email, street, postal code, or city is required.',
    });
  }
  if (!user || !user.name || !user.email) {
    return res.status(400).json({
      message: 'User information is required to place an order.',
    });
  }
  const orderTotal = items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  function generateUniqueOrderId(callback) {
    const newId = Math.floor(Math.random() * 1000); 
    db.query('SELECT order_id FROM transactions WHERE order_id = ?', [newId], (err, results) => {
      if (err) return callback(err);
      if (results.length > 0) {
        return generateUniqueOrderId(callback);
      }
      callback(null, newId);
    });
  }
  generateUniqueOrderId((err, uniqueId) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to generate unique order ID.', error: err.message });
    }
    
   
    const newOrder = {
      order_id: uniqueId,
      order_date: currentDate, 
      order_total: orderTotal,
      order_status: 'in_progress', 
      order_name: customer.name, 
    };
    db.query('INSERT INTO transactions SET ?', newOrder, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to create order.', error: err.message });
      }
      res.status(201).json({
        message: 'Order created successfully!',
        order_id: uniqueId,
        ...newOrder,
      });
    });
  });
});

app.post('/api/auth/signin', (req, res) => {
  const { email, password } = req.body;

  try {
    db.query('SELECT * FROM accounts WHERE acc_email = ?', [email], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }

      if (results.length > 0) {
        const user = results[0]; 

        if (user.acc_password === password) {
          res.status(200).json({
            message: 'User found, logged in successfully.',
            user: {
              email: user.acc_email,
              name: user.acc_username, 
              street: user.acc_address,
              postalCode: user.acc_postal,
              city: user.acc_city
            }
          });
        } else {
          res.status(401).json({ message: 'Invalid email or password.' });
        }
      } else {
        res.status(401).json({ message: 'Invalid email or password.' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

app.post('/api/auth/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    db.query('SELECT * FROM accounts WHERE acc_email = ?', [email], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }

      if (results.length > 0) {
        return res.status(409).json({ message: 'User already exists.' });
      }

      const newUser = { 
        acc_email: email,
        acc_password: password,  
        role: 'user',             
        acc_address: '',
        acc_username: email,
      };

      db.query('INSERT INTO accounts SET ?', newUser, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Server error while creating user.' });
        }

        res.status(201).json({ message: 'Account created successfully.' });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

app.post('/api/auth/update', (req, res) => {
  const { email, name, street, postalCode, city } = req.body;
  console.log("Update request received for:", email);

  try {
    const query = `
      UPDATE accounts 
      SET acc_username = ?, acc_address = ?, acc_postal = ?, acc_city = ?
      WHERE acc_email = ?
    `;

    db.query(query, [name, street, postalCode, city, email], (err, results) => {
      if (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ message: 'Server error while updating user.' });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found.' });
      }

      res.status(200).json({ message: 'User updated successfully.' });
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: 'Server error while updating user.' });
  }
});

//Admin dashboard login
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM accounts WHERE acc_username = ? AND acc_password = ?';

  db.query(query, [username, password], (err, results) => {
      if (err) {
          console.error('Error during login query execution:', err);
          return res.status(500).json({ error: 'Server error during login' });
      }
      if (results.length === 0) {
          return res.status(401).json({ error: 'Invalid username or password' });
      }

      const user = results[0];
      delete user.password; 
      res.json(user); 
  });
});

//Get list
app.get('/:table', (req, res) => {
  const { table } = req.params;
  db.query(`SELECT * FROM ${table}`, (err, results) => {
    if (err) {
        console.error("Direct query error:", err.message);
        return res.status(500).json({ error: 'Error accessing the table directly' });
    }
    res.json(results);
  });
});

//Get one
app.get('/:table/:id', (req, res) => {
  const id = req.params.id;
  const { table } = req.params;
  let idField = `${table.replace(/s$/, "").split("_")[0]}_id`;
  if(table === 'accounts'){
    idField = "acc_id";
  }
  if(table === 'transactions'){
    idField = "order_id";
  }
  db.query('SELECT * FROM ?? WHERE ?? = ?', [table,idField,id], (err, results) => {
  if (err) return res.status(500).json({ error: 'Error' });
  if (results.length === 0) return res.status(404).json({ error: 'Item not found' });
  res.json(results[0]);
  });
});

app.put('/:table/:id', (req, res) => {
  const id = req.params.id;  
  const { table } = req.params;
  let idField = `${table.replace(/s$/, "").split("_")[0]}_id`;

  if (table === 'accounts') {
      idField = "acc_id";
  }
  if(table === 'transactions'){
    idField = "order_id";
  }
  const updatedItem = req.body; 
  delete updatedItem.id;

  db.query('UPDATE ?? SET ? WHERE ?? = ?', [table, updatedItem, idField, id], (err, result) => {
    if (err) {
        console.error('Error updating item:', err);
        return res.status(500).json({ error: 'Error updating item' });
    }

    if (result.affectedRows > 0) {
      return res.json({ ...updatedItem});
    } else {
      return res.status(404).json({ error: 'Item not found' });
    }
  });
});

app.post('/:table', (req, res) => {
  const { table } = req.params;
  const newItem = req.body;
  let idField = `${table.replace(/s$/, "").split("_")[0]}_id`;

  if (table === 'accounts') {
      idField = "acc_id";
  }
  if (table === 'transactions') {
    idField = "order_id";
  }

  db.query('INSERT INTO ?? SET ?', [table, newItem], (err, result) => {
    if (err) {
        console.error('Error creating item:', err);
        return res.status(500).json({ error: 'Error creating item' });
    }

    const createdItem = { ...newItem, [idField]: result.insertId };
    res.status(201).json(createdItem);  
  });
});

app.delete('/:table/:id', (req, res) => {
  const id = req.params.id;
  const { table } = req.params;
  let idField = `${table.replace(/s$/, "").split("_")[0]}_id`;
  if(table === 'accounts'){
    idField = "acc_id";
  }
  if(table === 'transactions'){
    idField = "order_id";
  }
    db.query('DELETE FROM ?? WHERE ?? = ?', [table,idField,id], (err) => {
        if (err) return res.status(500).json({ error: 'Cannot Delete'});

        res.json({ id });
    });
});

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

