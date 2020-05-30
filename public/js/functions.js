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

module.exports = {
    extractbetween,
    writejson
};