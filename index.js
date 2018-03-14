/*
Group 29
CS361
March 5, 2018
Part of Assignment 6 implementation Requirements
This will be our main file. Eventually we will type run forever start index.js and we will be able to acces that website
*/

//This requires the datafile which containes the array of 20 charities. 
var cArray = require('./data.js')
var cdb = cArray.cdb;

/*
Includes the search class accessible under the namespace search
Type: Class
Parameter: (searchphrase:string , database:jsonArray)
*/
var search = require('./search.js')

//Showing that the search class works
let testSearch = new search("children", cdb);
//testSearch.testMethod();

//various required modules to host a website with node.js
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);

//Home Page
app.get('/', function (req, res, next) {
    var context = {title:"Home"};
    res.render('home',context);

});

//Results Page
app.get('/results', function (req, res, next) {
	var context = {};
    context.title = "Search Results";
    var array1 = testSearch.searchCharities(req.query.name);
	context.results = array1;
	var array2 = testSearch.searchLocation(req.query.location);
	context.location = array2;
	var array3 = testSearch.searchType(req.query.type);
	context.type = array3;	
    res.render('resultspage',context); 
});

//Charity Info Page
app.get('/charityinfo', function (req, res) {
    var context = {};
    context.title = "Charity Information";
	var charInfo = testSearch.searchCharities(req.query.charityName);
	context.info = charInfo[0];
	//console.log(context.info["name"]);
    res.render('charitypage',context); 
});

app.use(function(req,res){
    res.status(404);
    res.render('404');
  });
  
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
  });
  
  app.listen(app.get('port'), function(){
    console.log('Express started on flip#.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
  });