const fs = require('fs');

async function loadDataset(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf-8', (err, data) => {
            if (err) reject(err);
            resolve(JSON.parse(data));
        });
    });
}

module.exports = loadDataset;
