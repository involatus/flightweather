const run = require('./functions.js');

const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

// Meteoblue
function downloadmeteoblue() {
    fetch('https://www.meteoblue.com/de/wetter/14-tage/lupfig_schweiz_7648244')
        .then(res => res.text())
        .then(body => {
            // Load HTML in cheerio
            const $ = cheerio.load(body);
            const htmlbody = $('*');

            let meteoblue = {
                d14: ''
            };
            meteoblue.d14 = 'http:' + htmlbody.find('#chart_download').attr('href'); // extract title
            //run.writejson(meteoblue, 'meteoblue');
            fetch(meteoblue.d14)
                .then(res => {
                    const dest = fs.createWriteStream('./public/img/' + 'meteoblue14d' + '.png');
                    res.body.pipe(dest);
                });
        });
};

module.exports = {
    downloadmeteoblue: downloadmeteoblue
};

downloadmeteoblue();