const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const { writeFile, readdirSync, statSync } = require('fs');
const { prettyPrint } = require('html');


const components = [
  { title: 'Button', link: 'button/index.html' },
  { title: 'Modal', link: 'modal/index.html' },
];

const config = {
  root: `${process.cwd()}/_includes/components`,
};


function findFolders(path) {
  return readdirSync(path)
    .filter(file => statSync(`${path}/${file}`).isDirectory())
}


function createIndex() {
  writeFile(
    `${process.cwd()}/pattern-library/index.html`,
    prettyPrint(`
      <html>
        <body>
          <ul>
            ${components.map(({ title, link }) => `<li><a href="${link}">${title}</a></li>`).join('')}
          </ul>
        </body>
      </html>
    `),
    (err) => {
      if (err) {
        return console.error(err);
      }

      return console.log(findFolders(config.root));
    },
  );
}


function clearFiles() {
  rimraf(
    `${process.cwd()}/pattern-library/**/*`,
    (err) => {
      if (err) {
        return console.error(err);
      }

      return createIndex();
    },
  );
}


function createDir() {
  mkdirp(
    `${process.cwd()}/pattern-library`,
    (err) => {
      if (err) {
        return console.error(err);
      }

      return clearFiles();
    },
  );
}


createDir();
