const run = require('./functions.js');

const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

//locarno-airport_schweiz_7730644

let meteoblues = [
    { name: 'locarno', id: 'locarno-airport_schweiz_7730644' },
    { name: 'birrfeld', id: 'flugplatz-birrfeld_schweiz_11710953' },
    { name: 'sion', id: 'flughafen-sion_schweiz_6299717' },
    { name: 'samaden', id: 'flughafen-engadin_schweiz_7668330' },
    { name: 'genf', id: 'aeroport-geneve-cointrin_schweiz_2660644' }
];

// Meteoblue
function downloadmeteoblue() {
    meteoblues.forEach(
        function (meteoblue) {
            fetch('https://www.meteoblue.com/de/wetter/14-tage/' + meteoblue.id)
                .then(res => res.text())
                .then(body => {
                    // Load HTML in cheerio
                    const $ = cheerio.load(body);
                    const htmlbody = $('*');

                    let meteoblue_content = {
                        d14: ''
                    };
                    meteoblue_content.d14 = 'http:' + htmlbody.find('#chart_download').attr('href'); // extract title
                    fetch(meteoblue_content.d14)
                        .then(res => {
                            const dest = fs.createWriteStream('./public/img/' + 'meteoblue14d_' + meteoblue.name + '.png');
                            res.body.pipe(dest);
                        });
                });
        });
};
module.exports = {
    downloadmeteoblue: downloadmeteoblue
};

downloadmeteoblue();