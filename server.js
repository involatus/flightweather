var flugwetterCH = require('./api/flugwetterCH.json');

// server.js
// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static('public'));

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {

    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

    res.render('pages/index', {
        drinks: drinks,
        tagline: tagline,
        flugwetterCH: flugwetterCH
    });
});

// about page 
app.get('/webcams', function(req, res) {
    res.render('pages/webcams');
});

app.listen(8080);
console.log('8080 is the magic port');