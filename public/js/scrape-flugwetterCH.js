const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

/*********************
FUNCTIONS
**********************/
function extractbetween(body, start, end) {
    //regex definition   
    const regex = /(?:<br>|\n|\r|\t)/gm;
    const str = body.replace(regex, '');
    //extract logic
    const startindex = str.indexOf(start) + start.length;
    const endindex = str.indexOf(end);
    const result = str.slice(startindex, endindex);
    return result;
};

function writejson(object, name) {
    let data = JSON.stringify(object, null, 2);
    fs.writeFile('./public/json/' + name + '.json', data, (err) => {
        if (err) throw err;
        console.log(name + '.json File written');
    });
};

// Flugwetterueberischt - Schweiz
function downloadFlugwetterCH() {
    fetch('https://msmangasser:alvaster@www.flugwetter.de/fw/berichte/uebersicht/schweiz.htm')
    .then(res => res.text())
    .then(body => {
        // Load HTML in cheerio
        const $ = cheerio.load(body);
        const htmlbody = $('*');

        let flugwetterCH = {
            titel: '',
            basic: '',
            jura: '',
            voralpen: '',
            engadin: '',
            gefahren: '',
            aussichten: '',
            validity: ''
        };

        // extract Flugwetteruebersicht - Schweiz
        flugwetterCH.titel = htmlbody.find('h1').text(); // extract title
        flugwetterCH.basic = extractbetween(body, 'WETTERLAGE', 'WOLKEN, SICHT,');
        flugwetterCH.jura = extractbetween(body, 'Flachland und Jura:', 'Voralpen und Alpen:');
        flugwetterCH.voralpen = extractbetween(body, 'Voralpen und Alpen:', 'Alpensuedseite und Engadin:');
        flugwetterCH.engadin = extractbetween(body, 'Alpensuedseite und Engadin:', 'GEFAHREN');
        flugwetterCH.gefahren = extractbetween(body, 'GEFAHREN', 'AUSSICHTEN BIS MITTERNACHT');
        flugwetterCH.aussichten = extractbetween(body, 'AUSSICHTEN BIS MITTERNACHT', 'WIND (GRAD/KT)');
        flugwetterCH.validity = extractbetween(body, 'von MeteoSchweiz am ', 'WETTERLAGE');
        writejson(flugwetterCH, 'flugwetterCH');
    });
};

    module.exports = {
        downloadFlugwetterCH: downloadFlugwetterCH
    };