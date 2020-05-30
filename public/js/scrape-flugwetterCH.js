const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

const functions = require('./functions.js');

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
        flugwetterCH.basic = functions.extractbetween(body, 'WETTERLAGE', 'WOLKEN, SICHT,');
        flugwetterCH.jura = functions.extractbetween(body, 'Flachland und Jura:', 'Voralpen und Alpen:');
        flugwetterCH.voralpen = functions.extractbetween(body, 'Voralpen und Alpen:', 'Alpensuedseite und Engadin:');
        flugwetterCH.engadin = functions.extractbetween(body, 'Alpensuedseite und Engadin:', 'GEFAHREN');
        flugwetterCH.gefahren = functions.extractbetween(body, 'GEFAHREN', 'AUSSICHTEN BIS MITTERNACHT');
        flugwetterCH.aussichten = functions.extractbetween(body, 'AUSSICHTEN BIS MITTERNACHT', 'WIND (GRAD/KT)');
        flugwetterCH.validity = functions.extractbetween(body, 'von MeteoSchweiz', 'WETTERLAGE');
        functions.writejson(flugwetterCH, 'flugwetterCH');
    });
};

    module.exports = {
        downloadFlugwetterCH: downloadFlugwetterCH
    };

    downloadFlugwetterCH();