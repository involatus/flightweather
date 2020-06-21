const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

const functions = require('./functions.js');

// METAR TAF
function downloadMetarTaf(icao) {
    fetch('https://msmangasser:alvaster@www.flugwetter.de/fw/metartaf/bulletin.htm?tp=sa%40ft%40fc&flag=' + icao)
    .then(res => res.text())
    .then(body => {
        // Load HTML in cheerio
        const $ = cheerio.load(body);
        const htmlbody = $('*');

        let metar = htmlbody.find('body > table:nth-child(16) > tbody > tr:nth-child(1) > td:nth-child(3) > table:nth-child(6) > tbody > tr > td:nth-child(2)').text();
        const taf = htmlbody.find('body > table:nth-child(16) > tbody > tr:nth-child(1) > td:nth-child(3) > table:nth-child(8) > tbody > tr > td:nth-child(2)').text();
        
        //console.log(taf);
        return taf;

        //functions.writejson(metars, 'metars');
    });
};



let result = downloadMetarTaf('lszh');
console.log(result);