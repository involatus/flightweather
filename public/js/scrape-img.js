const fs = require('fs');
const fetch = require('node-fetch');

//Read Images from JSON + Download
function downloadIMG() {
    fs.readFile('./public/json/images.json', (err, data) => {
        if (err) throw err;
        let images = JSON.parse(data);
        images.forEach(img => {
            fetch(img.url)
                .then(res => {
                    const dest = fs.createWriteStream('./public/img/' + img.name + '.png');
                    res.body.pipe(dest);
                });
        });
    });
};

module.exports = {
    downloadIMG: downloadIMG
};