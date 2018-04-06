const connect = require('connect');
const serveStatic = require('serve-static');

connect()
  .use(serveStatic(`${process.cwd()}/pattern-library`))
  .listen(8080, () => console.log('Server running at http://localhost:8080'));
