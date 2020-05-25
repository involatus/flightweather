const fetch = require('node-fetch');
const cheerio = require('cheerio');
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
module.exports = (req, res) => {
  const date = fetch('https://msmangasser:alvaster@www.flugwetter.de/fw/berichte/uebersicht/schweiz.htm')
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
      // writejson(flugwetterCH, 'flugwetterCH');
      return flugwetterCH;
  });
  date.then(dateREsolved => res.status(200).send(dateREsolved));
  //res.status(200).send(date);
};