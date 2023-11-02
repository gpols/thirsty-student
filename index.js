// Import express and ejs
var express = require('express')
var ejs = require('ejs')
var bodyParser = require('body-parser')
var path = require('path')

// Create the express application object
const app = express()
const port = 8000
// Middleware to parse URL-encoded form data and make it available in req.body
app.use(bodyParser.urlencoded({ extended: true }))

// Set the directory where Express will pick up HTML files
// __dirname will get the current directory
app.set('views', __dirname + '/views')
// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')))

// Tells Express how we should process HTML files
// We want to use EJS's rendering engine
app.engine('html', ejs.renderFile)

// Define our data
var shopData = {
  shopName: 'Pub Express',
  productCategories: ['Beer', 'Wine', 'Soft Drinks', 'Hot Drinks'],
  shopLocations: ['Camden', 'New Cross', 'Peckham'],
  managerDetails: ['Bob Rob', 'bobrob@pubpour.com', '172 Garrat Lane']
}

// Handle our routes
app.get('/', function (req, res) {
  res.render('index.html', shopData)
})

app.get('/about', function (req, res) {
  res.render('about.html', shopData)
})

app.get('/search', function (req, res) {
  res.render('search.html', shopData)
})

app.get('/search-result', function (req, res) {
  // send a message with keyword typed
  res.send('You searched for: ' + req.query.keyword)
})

app.get('/register', function (req, res) {
  res.render('register.html', shopData)
})

app.post('/registered', function (req, res) {
  // Saving data in the database
  // send message
  res.send(
    'Hello ' +
      req.body.first +
      ' ' +
      req.body.last +
      ', you are now registered! We will send an email to you at ' +
      req.body.email
  )
})

// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
