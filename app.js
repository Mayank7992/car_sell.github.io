const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_mysql_password',
  database: 'car_selling_db',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Validate credentials and perform login logic
  // For simplicity, let's assume a basic login without database check
  res.send(`Welcome, ${username}!`);
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  // Save form data to the database
  const insertQuery = 'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)';
  db.query(insertQuery, [name, email, message], (err, results) => {
    if (err) {
      console.error('Error saving message to the database:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Message saved to the database');
      res.send('Message sent successfully!');
    }
  });
});

// Server Start
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
