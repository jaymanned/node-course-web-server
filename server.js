const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// EXPRESS MIDDLEWARE
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method}  ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err)
      console.log('Unable to append to server log');
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// HELPERS
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
});

// ROUTING
app.get('/', (req, res) => {
  // res.send('<h1>Hi ya all!<h1>');

  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeText: 'Welcome to the pleasure dome'
  });
});

app.get('/about', (req, res) => {
  // res.send('<h1>Hi ya all!<h1>');

  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/projects', (req, res) => {
  // res.send('<h1>Hi ya all!<h1>');

  res.render('projects.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/bad', (req, res) => {
  // res.send('<h1>Hi ya all!<h1>');

  res.send({
    errorMessage: 'Some error occurred',
    code: '100'
  });
});

app.listen(port, () => {
  console.log(`Server up on port ${port}`);
});
