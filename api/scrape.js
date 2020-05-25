'use strict';

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
    fs.writeFile(name + '.json', data, (err) => {
        if (err) throw err;
        console.log(name + '.json File written');
    });
};


//Read Images from JSON + Download 
fs.readFile('images.json', (err, data) => {
    if (err) throw err;
    let images = JSON.parse(data);
    images.forEach(img => {
        fetch(img.url)
            .then(res => {
                const dest = fs.createWriteStream('../public/img/' + img.name + '.png');
                res.body.pipe(dest);
            });
    });
});

// Flugwetterueberischt - Schweiz
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
            aussichten: ''
        };

        // extract Flugwetteruebersicht - Schweiz
        flugwetterCH.titel = htmlbody.find('h1').text(); // extract title
        flugwetterCH.basic = extractbetween(body, 'WETTERLAGE', 'WOLKEN, SICHT,');
        flugwetterCH.jura = extractbetween(body, 'Flachland und Jura:', 'Voralpen und Alpen:');
        flugwetterCH.voralpen = extractbetween(body, 'Voralpen und Alpen:', 'Alpensuedseite und Engadin:');
        flugwetterCH.engadin = extractbetween(body, 'Alpensuedseite und Engadin:', 'GEFAHREN');
        flugwetterCH.gefahren = extractbetween(body, 'GEFAHREN', 'AUSSICHTEN BIS MITTERNACHT');
        flugwetterCH.aussichten = extractbetween(body, 'AUSSICHTEN BIS MITTERNACHT', 'WIND (GRAD/KT)');
        writejson(flugwetterCH, 'flugwetterCH');
    });


// 3-Tages-Prognose-Alpenraum
fetch('https://msmangasser:alvaster@www.flugwetter.de/fw/berichte/3dprog/alps.htm')
    .then(res => res.text())
    .then(body => {
        // Load HTML in cheerio
        const $ = cheerio.load(body);
        const htmlbody = $('*');

        let threedayoutlook = {
            titel: '',
            day1: '',
            day2: '',
            day3: '',
        };

        // extract 3-Tages-Pronose-Alpenraum
        threedayoutlook.titel = htmlbody.find('h1').text(); // extract title

    });


// Lowlevel SWC
/*fetch('https://msmangasser:alvaster@www.flugwetter.de/fw/chartsga/alps/alp_swc.htm?zeit=1')
    .then(res => res.text())
    .then(body => {
        // Load HTML in cheerio
        const $ = cheerio.load(body);
        const htmlbody = $('*');

        const test = htmlbody.find('tbody > tr > td > img').last('img').attr('src');
        const test2 = test.split('=');
        console.log(test2[1]);
        fetch('https://msmangasser:alvaster@www.flugwetter.de/fw/scripts/getimg.php?src=' + test2[1])
            .then(res => {
                const dest = fs.createWriteStream('../public/assets/img/' + 'LLSWC1' + '.png');
                res.body.pipe(dest);
            });


        //body > table:nth-child(16) > tbody > tr:nth-child(1) > td:nth-child(3) > table:nth-child(5) > tbody > tr > td > img
        
        //https://msmangasser:alvaster@www.flugwetter.de/fw/scripts/getimg.php?src=qgdb48_loww_0000.png 02-06
        //https://www.flugwetter.de/fw/scripts/getimg.php?src=qgdc48_loww_0000.png 06-10
        
        //https://www.flugwetter.de/fw/scripts/getimg.php?src=qgdb48_loww_0400.png 06-10
        //https://www.flugwetter.de/fw/scripts/getimg.php?src=qgdc48_loww_0400.png 10-14

        //https://www.flugwetter.de/fw/scripts/getimg.php?src=qgdb48_loww_0800.png 10-14
        //https://www.flugwetter.de/fw/scripts/getimg.php?src=qgdc48_loww_0800.png 14-18

        //https://www.flugwetter.de/fw/scripts/getimg.php?src=qgdb48_loww_1200.png 14-18
        //https://www.flugwetter.de/fw/scripts/getimg.php?src=qgdc48_loww_1200.png 18-22

        //https://www.flugwetter.de/fw/scripts/getimg.php?src=qgdb48_loww_1600.png 18-22
        //https://www.flugwetter.de/fw/scripts/getimg.php?src=qgdc48_loww_1600.png 22-02

    });*/