const express = require('express');
const path = require('path');
const app = express();
const dayjs = require('dayjs');
const utils = require('./utils');
const dotenv = require('dotenv');

dotenv.config();

// Serve static files from the 'assets' directory
app.use(express.static('assets'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS and specify the views directory
app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');

// Serve the 'style.css' file with the correct MIME type
app.get('/style.css', (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, 'assets', 'style.css'));
});

// Serve the home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/view/home.html');
});

// Handle the 'add-user' POST request
app.post('/add-user', (req, res) => {
  const { name, birth } = req.body;
  const users = utils.getUsers();
  users.push({ name, birth });
  utils.saveUsers(users);
  res.redirect('/users');
});

// Serve the 'users' page
app.get('/users', (req, res) => {
  const users = utils.getUsers();
  res.render('users', { users, utils });
});

// Handle the 'delete-user' POST request
app.post('/delete-user', (req, res) => {
  const { id } = req.body;
  const users = utils.getUsers();
  users.splice(id, 1);
  utils.saveUsers(users);
  res.redirect('/users');
});

// Start the server
app.listen(process.env.APP_PORT, process.env.APP_LOCALHOST, () => {
  console.log(`Server started on ${process.env.APP_LOCALHOST}:${process.env.APP_PORT}`);
});