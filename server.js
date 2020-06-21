// Import JSON
var flugwetterCH = require('./public/json/flugwetterCH.json');

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
        page: 'home',
        drinks: drinks,
        tagline: tagline,
        flugwetterCH: flugwetterCH,
    });
});

// Forecast page 
app.get('/forecast', function(req, res) {
    res.render('pages/forecast', {
        page: 'forecast',

        flugwetterCH: flugwetterCH,
    });
});

// Webcams page 
app.get('/webcams', function(req, res) {

    let roundshots = [
        {name: 'LSZF', id: '4d4ace145f81c381b57a67cee137338c', url: 'https://birrfeld.roundshot.com/' },
        {name: 'Jungfrau-Ostgrat', id: '862', url: 'https://jungfrau.roundshot.com/top-of-europe-jungfrau-ostgrat/' },
        {name: 'LSZS', id: '473', url: 'https://engadin-airport.roundshot.com/' }
        
    ];
/*
    let roundshots = {
            birrfeld: {
                LSZF: {
                    name: 'LSZF',
                    id: '4d4ace145f81c381b57a67cee137338c',
                    url: 'https://birrfeld.roundshot.com/'
                },
                Uetliberg: {
                    name: 'Uetliberg',
                    id: '78',
                    url: 'https://uetliberg.roundshot.com/'
                }
            },
            bern: {
                Jungfrau: {
                    name: 'Jungfrau-Ostgrat',
                    id: '862',
                    url: 'https://jungfrau.roundshot.com/top-of-europe-jungfrau-ostgrat/'
                }
            },            
            engadin: {
                LSZS: {
                    name: 'LSZS',
                    id: '473',
                    url: 'https://engadin-airport.roundshot.com/'
                }
            }
        };
*/

    res.render('pages/webcams', {
        page: 'webcams',
        roundshots: roundshots,
    });
});



// Reload Content
app.get('/reload', function(req, res) {
    var run = require('./public/js/scrape-img.js');
    res.send(run.downloadIMG());

    var run2 = require('./public/js/scrape-flugwetterCH.js');
    res.send(run2.downloadFlugwetterCH());

    var run3 = require('./public/js/scrape-meteoblue.js');
    res.send(run3.downloadmeteoblue());
});


app.listen(8080);
console.log('8080 is the magic port');