const fs = require('fs');
const path = require('path');

const versionFile = path.join(__dirname, '../src/version.json');

const data = JSON.parse(fs.readFileSync(versionFile));
const version = (data.version || 0) + 1;
fs.writeFileSync(versionFile, JSON.stringify({ version }, null, 2));
