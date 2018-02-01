const finalhandler = require('finalhandler');
const http = require('http');
const serveIndex = require('serve-index');
const serveStatic = require('serve-static');
const opn = require('opn');

const index = serveIndex(
  process.cwd(),
  { filter: filename => /(\.html$)|^[^\.]*$/i.test(filename) },
);
const serve = serveStatic(
  process.cwd(),
  { index: false },
);


const server = http.createServer((req, res) => {
  const done = finalhandler(req);

  serve(req, res, (err) => {
    if (err) {
      return done(err);
    }

    return index(req, res, done);
  });
});

server.listen(
  8080,
  () => {
    opn('http://localhost:8080/_includes/');
  },
);
