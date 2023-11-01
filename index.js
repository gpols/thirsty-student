// Import express and ejs
var express = require ('express')
var ejs = require('ejs')
// Create the express application object
const app = express()
const port = 8000
// Set the directory where Express will pick up HTML files
// __dirname will get the current directory
app.set('views', __dirname + '/views');
// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');
// Tells Express how we should process html files
// We want to use EJS's rendering engine
app.engine('html', ejs.renderFile);
// define our data
var shopData = {shopName: "The beer shop",
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
// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

