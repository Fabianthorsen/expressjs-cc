const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

// Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Homepage Route
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Member App',
    members,
  })
);

// Init middleware
app.use(express.json()); // Bodyparser middleware
app.use(express.urlencoded({ extended: false })); // Handle url encoded data
app.use(logger); // Custom middleware for logging type of request on which url
app.use(express.static(path.join(__dirname, 'public'))); // Set public as static folder
app.use('/api/members', require('./routes/api/members')); // Set up router (Members API routes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server started on ' + PORT);
});
