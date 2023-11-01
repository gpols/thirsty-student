// Import express and ejs
var express = require ('express')
var ejs = require('ejs')
var bodyParser= require ('body-parser')
var path = require('path')

// Create the express application object
const app = express()
const port = 8000
app.use(bodyParser.urlencoded({ extended: true }))


// Set the directory where Express will pick up HTML files
// __dirname will get the current directory
app.set('views', __dirname + '/views');
// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')))

// Tells Express how we should process html files
// We want to use EJS's rendering engine
app.engine('html', ejs.renderFile);
// define our data
var shopData = {shopName: "The beer",
productCategories:["Beer", "Wine", "Soft Drinks", "Hot Drinks"], shopLocations:["Camden", "New Cross", "Peckham"], managerDetails:["Bob Rob", "172 Garrat Lane"]};
// Handle our routes
app.get('/',function(req,res){
res.render('index.html', shopData)
});
app.get('/about',function(req,res){
res.render('about.html', shopData);
});
app.get('/search',function(req,res){
res.render("search.html", shopData);
});
app.get('/search-result', function (req, res) {
    // TODO: search in the database
    res.send("You searched for: " + req.query.keyword);
 });
 app.get('/register', function (req,res) {
    res.render('register.html',shopData);
});                                                                                                 
app.post('/registered', function (req,res) {
    // saving data in database
    res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!'  + ' ' + 'We will send an email to you at' + ' ' + req.body.email);   
}); 

// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

