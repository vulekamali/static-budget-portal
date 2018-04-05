const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const fs = require('fs');
const { writeFileSync, readdirSync, statSync, readFileSync } = require('fs');
const { prettyPrint } = require('html');
const { basename, extname } = require('path');
const marked = require('marked');
const frontMatter = require('front-matter');

const config = {
  root: `${process.cwd()}/_includes/components`,
  destination: `${process.cwd()}/pattern-library`,
};


const css = `
@font-face {
  font-family: octicons-link;
  src: url(data:font/woff;charset=utf-8;base64,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) format('woff');
}

body {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  line-height: 1.5;
  color: #24292e;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
  padding-bottom: 100px;
  max-width: 800px;
  margin: 0 auto;
}

.pl-c {
  color: #6a737d;
}

.pl-c1,
.pl-s .pl-v {
  color: #005cc5;
}

.pl-e,
.pl-en {
  color: #6f42c1;
}

.pl-smi,
.pl-s .pl-s1 {
  color: #24292e;
}

.pl-ent {
  color: #22863a;
}

.pl-k {
  color: #d73a49;
}

.pl-s,
.pl-pds,
.pl-s .pl-pse .pl-s1,
.pl-sr,
.pl-sr .pl-cce,
.pl-sr .pl-sre,
.pl-sr .pl-sra {
  color: #032f62;
}

.pl-v,
.pl-smw {
  color: #e36209;
}

.pl-bu {
  color: #b31d28;
}

.pl-ii {
  color: #fafbfc;
  background-color: #b31d28;
}

.pl-c2 {
  color: #fafbfc;
  background-color: #d73a49;
}

.pl-c2::before {
  content: "^M";
}

.pl-sr .pl-cce {
  font-weight: bold;
  color: #22863a;
}

.pl-ml {
  color: #735c0f;
}

.pl-mh,
.pl-mh .pl-en,
.pl-ms {
  font-weight: bold;
  color: #005cc5;
}

.pl-mi {
  font-style: italic;
  color: #24292e;
}

.pl-mb {
  font-weight: bold;
  color: #24292e;
}

.pl-md {
  color: #b31d28;
  background-color: #ffeef0;
}

.pl-mi1 {
  color: #22863a;
  background-color: #f0fff4;
}

.pl-mc {
  color: #e36209;
  background-color: #ffebda;
}

.pl-mi2 {
  color: #f6f8fa;
  background-color: #005cc5;
}

.pl-mdr {
  font-weight: bold;
  color: #6f42c1;
}

.pl-ba {
  color: #586069;
}

.pl-sg {
  color: #959da5;
}

.pl-corl {
  text-decoration: underline;
  color: #032f62;
}

.octicon {
  display: inline-block;
  vertical-align: text-top;
  fill: currentColor;
}

a {
  background-color: transparent;
}

a:active,
a:hover {
  outline-width: 0;
}

strong {
  font-weight: inherit;
}

strong {
  font-weight: bolder;
}

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

img {
  border-style: none;
}

code,
kbd,
pre {
  font-family: monospace, monospace;
  font-size: 1em;
}

hr {
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}

input {
  font: inherit;
  margin: 0;
}

input {
  overflow: visible;
}

[type="checkbox"] {
  box-sizing: border-box;
  padding: 0;
}

* {
  box-sizing: border-box;
}

input {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

a {
  color: #0366d6;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

strong {
  font-weight: 600;
}

hr {
  height: 0;
  margin: 15px 0;
  overflow: hidden;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #dfe2e5;
}

hr::before {
  display: table;
  content: "";
}

hr::after {
  display: table;
  clear: both;
  content: "";
}

table {
  border-spacing: 0;
  border-collapse: collapse;
}

td,
th {
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: 0;
}

h1 {
  font-size: 32px;
  font-weight: 600;
}

h2 {
  font-size: 24px;
  font-weight: 600;
}

h3 {
  font-size: 20px;
  font-weight: 600;
}

h4 {
  font-size: 16px;
  font-weight: 600;
}

h5 {
  font-size: 14px;
  font-weight: 600;
}

h6 {
  font-size: 12px;
  font-weight: 600;
}

p {
  margin-top: 0;
  margin-bottom: 10px;
}

blockquote {
  margin: 0;
}

ul,
ol {
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
}

ol ol,
ul ol {
  list-style-type: lower-roman;
}

ul ul ol,
ul ol ol,
ol ul ol,
ol ol ol {
  list-style-type: lower-alpha;
}

dd {
  margin-left: 0;
}

code {
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  font-size: 12px;
}

pre {
  margin-top: 0;
  margin-bottom: 0;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  font-size: 12px;
}

.octicon {
  vertical-align: text-bottom;
}

.pl-0 {
  padding-left: 0 !important;
}

.pl-1 {
  padding-left: 4px !important;
}

.pl-2 {
  padding-left: 8px !important;
}

.pl-3 {
  padding-left: 16px !important;
}

.pl-4 {
  padding-left: 24px !important;
}

.pl-5 {
  padding-left: 32px !important;
}

.pl-6 {
  padding-left: 40px !important;
}

.markdown-body::before {
  display: table;
  content: "";
}

.markdown-body::after {
  display: table;
  clear: both;
  content: "";
}

.markdown-body>*:first-child {
  margin-top: 0 !important;
}

.markdown-body>*:last-child {
  margin-bottom: 0 !important;
}

a:not([href]) {
  color: inherit;
  text-decoration: none;
}

.anchor {
  float: left;
  padding-right: 4px;
  margin-left: -20px;
  line-height: 1;
}

.anchor:focus {
  outline: none;
}

p,
blockquote,
ul,
ol,
dl,
table,
pre {
  margin-top: 0;
  margin-bottom: 16px;
}

hr {
  height: 0.25em;
  padding: 0;
  margin: 24px 0;
  background-color: #e1e4e8;
  border: 0;
}

blockquote {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
}

blockquote>:first-child {
  margin-top: 0;
}

blockquote>:last-child {
  margin-bottom: 0;
}

kbd {
  display: inline-block;
  padding: 3px 5px;
  font-size: 11px;
  line-height: 10px;
  color: #444d56;
  vertical-align: middle;
  background-color: #fafbfc;
  border: solid 1px #c6cbd1;
  border-bottom-color: #959da5;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 #959da5;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

h1 .octicon-link,
h2 .octicon-link,
h3 .octicon-link,
h4 .octicon-link,
h5 .octicon-link,
h6 .octicon-link {
  color: #1b1f23;
  vertical-align: middle;
  visibility: hidden;
}

h1:hover .anchor,
h2:hover .anchor,
h3:hover .anchor,
h4:hover .anchor,
h5:hover .anchor,
h6:hover .anchor {
  text-decoration: none;
}

h1:hover .anchor .octicon-link,
h2:hover .anchor .octicon-link,
h3:hover .anchor .octicon-link,
h4:hover .anchor .octicon-link,
h5:hover .anchor .octicon-link,
h6:hover .anchor .octicon-link {
  visibility: visible;
}

h1 {
  padding-bottom: 0.3em;
  font-size: 2em;
  border-bottom: 1px solid #eaecef;
}

h2 {
  padding-bottom: 0.3em;
  font-size: 1.5em;
  border-bottom: 1px solid #eaecef;
}

h3 {
  font-size: 1.25em;
}

h4 {
  font-size: 1em;
}

h5 {
  font-size: 0.875em;
}

h6 {
  font-size: 0.85em;
  color: #6a737d;
}

ul,
ol {
  padding-left: 2em;
}

ul ul,
ul ol,
ol ol,
ol ul {
  margin-top: 0;
  margin-bottom: 0;
}

li {
  word-wrap: break-all;
}

li>p {
  margin-top: 16px;
}

li+li {
  margin-top: 0.25em;
}

dl {
  padding: 0;
}

dl dt {
  padding: 0;
  margin-top: 16px;
  font-size: 1em;
  font-style: italic;
  font-weight: 600;
}

dl dd {
  padding: 0 16px;
  margin-bottom: 16px;
}

table {
  display: block;
  width: 100%;
  overflow: auto;
}

table th {
  font-weight: 600;
}

table th,
table td {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

table tr {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}

table tr:nth-child(2n) {
  background-color: #f6f8fa;
}

img {
  max-width: 100%;
  box-sizing: content-box;
  background-color: #fff;
}

img[align=right] {
  padding-left: 20px;
}

img[align=left] {
  padding-right: 20px;
}

code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27,31,35,0.05);
  border-radius: 3px;
}

pre {
  word-wrap: normal;
}

pre>code {
  padding: 0;
  margin: 0;
  font-size: 100%;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border: 0;
}

.highlight {
  margin-bottom: 16px;
}

.highlight pre {
  margin-bottom: 0;
  word-break: normal;
}

.highlight pre,
pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
}

pre code {
  display: inline;
  max-width: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: inherit;
  word-wrap: normal;
  background-color: transparent;
  border: 0;
}

.full-commit .btn-outline:not(:disabled):hover {
  color: #005cc5;
  border-color: #005cc5;
}

kbd {
  display: inline-block;
  padding: 3px 5px;
  font: 11px "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  line-height: 10px;
  color: #444d56;
  vertical-align: middle;
  background-color: #fafbfc;
  border: solid 1px #d1d5da;
  border-bottom-color: #c6cbd1;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 #c6cbd1;
}

:checked+.radio-label {
  position: relative;
  z-index: 1;
  border-color: #0366d6;
}

.task-list-item {
  list-style-type: none;
}

.task-list-item+.task-list-item {
  margin-top: 3px;
}

.task-list-item input {
  margin: 0 0.2em 0.25em -1.6em;
  vertical-align: middle;
}

hr {
  border-bottom-color: #eee;
}

pre {
  width: 100%;
  background: black !important;
  color: white !important;
  padding: 20px !important;
  display: inline-block !important;
}`;


// index, info, example
function buildHtmlShell(content, type) {
  const scripts = type === 'example' ? '../assets/generated/scripts.js' : '';

  const createStylesheet = () => {
    if (type === 'index') {
      return '<link rel="stylesheet" href="assets/base/styles.css">';
    } else if (type === 'info') {
      return '<link rel="stylesheet" href="../assets/base/styles.css">';
    } else if (type === 'example') {
      return '<link rel="stylesheet" href="../assets/generated/styles.css">';
    }

    return '';
  };

  return prettyPrint(`<!doctype>
  <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      ${createStylesheet()}
    </head>
    <body style="padding: 20px">
      ${type === 'index' ? '<h1>Vulekamali Pattern Library</h1>' : ''}
      ${content}
      <script src="${scripts}"></script>
    </body>
  </html>`);
}

function getParentPath(path) {
  const fileName = basename(path);
  const folderPath = path.match(new RegExp(`.+(?=\/${fileName})`))[0];
  return folderPath;
}

function getParentFolderName(path) {
  const parentFolder = getParentPath(path).match(/\w+$/)[0];
  return parentFolder;
}


function createHtml(path, content, type, labels = {}) {
  const buildLabel = () => {
    let labelsCode = '';
    let title = '';

    if (labels) {
      const labelsKeys = labels ? Object.keys(labels).filter(label => label !== 'title') : [];
      if (labelsKeys.length > 0) {
        labelsCode = labelsKeys.map((key) => {
          const val = labels[key];
          return `<span style="font-size:  14px; background: ${val.background}; color: ${val.color}; border-radius: 50px; padding: 5px 15px; position:  relative; bottom: 6px; margin-left: 10px;">${val.text}</span>`;
        }).join('');
      }

      if (labels.title) {
        title = labels.title;
      }
    }

    return type === 'info' ? `<h1>${title}${labelsCode}</h1>` : '';
  };

  writeFileSync(
    path,
    buildHtmlShell(buildLabel() + content, type),
    (err) => {
      if (err) {
        return console.error(err);
      }

      return null;
    },
  );
}

function returnFiles(path) {
  return readdirSync(path)
    .filter(file => !statSync(`${path}/${file}`).isDirectory());
}

function findFolders(path) {
  return readdirSync(path)
    .filter(file => statSync(`${path}/${file}`).isDirectory());
}

function walkFilesInNestedFolders(start, action) {
  const files = returnFiles(start) || [];
  const folders = findFolders(start) || [];
  files.forEach(file => action(`${start}/${file}`));

  folders.forEach((path) => {
    walkFilesInNestedFolders(`${start}/${path}`, action);
  });
}

function findFiles(start, regex) {
  let files = [];

  const addToArrayIfReadme = (file) => {
    return regex.test(file) && files.push(file);
  };

  walkFilesInNestedFolders(
    start,
    addToArrayIfReadme,
  );

  return files;
}

function clearFiles(path) {
  return new Promise((resolve, reject) => {
    rimraf(
      `${path}/**/*`,
      (err) => {
        if (err) {
          reject(err);
        }

        return resolve();
      },
    );
  });
}

// 1
function createDir(path) {
  mkdirp(
    path,
    (err) => {
      if (err) {
        return console.error(err);
      }

      return null;
    },
  );
}


function getAllFileType(folder, extension) {
  const files = returnFiles(folder);
  const valid = files.filter((fileName) => {
    return extname(`${folder}/${fileName}`) === `.${extension}`;
  });

  return valid;
}

function createCustomObject(rawPaths) {
  return rawPaths.reduce(
    (results, path) => {
      const parentPath = getParentPath(path);
      const examplesNames = getAllFileType(`${parentPath}/examples`, 'html');
      const examples = examplesNames.reduce(
        (result, key) => {
          return {
            ...result,
            [key]: `${parentPath}//examples/${key}`,
          };
        },
        {},
      );

      return {
        ...results,
        [getParentFolderName(path)]: {
          content: frontMatter(readFileSync(path, 'utf-8')),
          path,
          examples,
        },
      };
    },
    {},
  );
}

function createComponentFiles(data) {
  const components = Object.keys(data);

  components.forEach((component) => {
    if (data[component].content.attributes.title) {
      const destination = `${config.destination}/${data[component].content.attributes.title}`;
      createDir(destination);
      createHtml(
        `${destination}/index.html`,
        marked(data[component].content.body),
        'info',
        data[component].content.attributes,
      );
    }
  });
}

function createRootIndex(data) {
  const markup = Object.keys(data).map((title) => {
    if (data[title].content.attributes.title) {
      const buildLabel = () => {
        let labelsCode = '';

        const labelsKeys = data[title].content.attributes ? Object.keys(data[title].content.attributes).filter(key => key !== 'title') : [];

        if (labelsKeys.length > 0) {
          labelsCode = labelsKeys.map((key) => {
            const val = data[title].content.attributes[key];
            return `<span style="font-size: 11px; background: ${val.background}; color: ${val.color}; border-radius: 50px; padding: 5px 20px; font-family: verdana, position: relative; bottom: 2px; margin-left: 10px;">${val.text}</span>`;
          }).join('');
        }

        return labelsCode;
      };

      return `<li><a style="font-size: 18px" href="${data[title].content.attributes.title}/index.html">${data[title].content.attributes.title}</a>${buildLabel()}</li>`;
    }

    return '';
  }).join('');


  return createHtml(`${config.destination}/index.html`, markup, 'index');
}

function parseExamples(data) {
  const components = Object.keys(data);

  components.forEach((name) => {
    if (data[name].content.attributes.title) {
      const component = data[name];
      const examples = Object.keys(component.examples);
      examples.forEach((fileName) => {
        const markup = readFileSync(component.examples[fileName], 'utf-8');
        createHtml(`${config.destination}/${name}/${fileName}`, markup, 'example');
      });
    }
  });
}


const rawPaths = findFiles(config.root, /README\.md/);
const data = createCustomObject(rawPaths);

createDir(config.destination);
clearFiles(config.destination)
  .then(() => {
    mkdirp(`${config.destination}/assets`);
    mkdirp(`${config.destination}/assets/base`);
    writeFileSync(`${config.destination}/assets/base/styles.css`, css);
    createRootIndex(data);
    createComponentFiles(data);
    parseExamples(data);
  })
  .catch(err => console.log(err));
