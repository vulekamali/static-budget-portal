const { copySync, emptyDirSync } = require('fs-extra');
const { green } = require('colour');

emptyDirSync('static');
copySync('packages/webapp/build/asset-manifest.json', '_data/webapp-assets.json');
copySync('packages/webapp/build/static', 'static');
console.log(green('\n\nVulekamli custom build complete!'));
