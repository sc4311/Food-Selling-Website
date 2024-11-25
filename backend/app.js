import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

const connection = mysql.createConnection({

  host: 'scrumpy-foods.cj0cmagoo0l5.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'scrumpyfoods2024!',
  database:'scrumpyfoods'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

app.use(express.json());
app.use(cors({
    methods: ['GET','POST','PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.get('/:table', (req, res) => {
  const { table } = req.params;
  connection.query(`SELECT * FROM ${table}`, (err, results) => {
    if (err) {
        console.error("Direct query error:", err.message);
        return res.status(500).json({ error: 'Error accessing the table directly' });
    }
    res.json(results);
});

});

app.get('/:table/:id', (req, res) => {
    const id = req.params.id;
    const { table } = req.params;
    let idField = `${table.replace(/s$/, "").split("_")[0]}_id`;
    if(table === 'accounts'){
      idField = "acc_id";
    }
    connection.query('SELECT * FROM ?? WHERE ?? = ?', [table,idField,id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error' });
    if (results.length === 0) return res.status(404).json({ error: 'Item not found' });
    res.json(results[0]);
    });
});

app.post('/:table', (req, res) => {
    const { table } = req.params;
    const newItem = req.body;
    connection.query('INSERT INTO ?? SET ?', [table,newItem], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: results.insertId, ...newItem });
    });
});

app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM accounts WHERE acc_username = ? AND acc_password = ?';

  connection.query(query, [username, password], (err, results) => {
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

app.put('/:table/:id', (req, res) => {
  const id = req.params.id;  
  const { table } = req.params;
  let idField = `${table.replace(/s$/, "").split("_")[0]}_id`;

  if (table === 'accounts') {
      idField = "acc_id";
  }

  const updatedItem = req.body; 
  delete updatedItem.id;

  connection.query('UPDATE ?? SET ? WHERE ?? = ?', [table, updatedItem, idField, id], (err, result) => {
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


app.delete('/:table/:id', (req, res) => {
  const id = req.params.id;
  const { table } = req.params;
  let idField = `${table.replace(/s$/, "").split("_")[0]}_id`;
  if(table === 'accounts'){
    idField = "acc_id";
  }
    connection.query('DELETE FROM ?? WHERE ?? = ?', [table,idField,id], (err) => {
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

app.listen(3000);
