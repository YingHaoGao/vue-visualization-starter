const fs = require('fs');
const chokidar = require('chokidar');
const listener = {
  name: 'listener',
  watchDir: './src/listener/',
  saveFilename: __dirname + '/listener.js',
  files: [],
  timer: null,
  match: /listener\/(.*).js$/,
};
const middleware = {
  name: 'middleware',
  watchDir: './src/middleware/',
  saveFilename: __dirname + '/middleware.js',
  files: [],
  timer: null,
  match: /middleware\/(.*).js$/,
};
const routes = {
  name: 'routes',
  watchDir: './src/modules/**/routes.js',
  saveFilename: __dirname + '/routes.js',
  files: [],
  timer: null,
  match: /modules\/(.*)\/routes.js$/,
};
const category = {
  name: 'category',
  watchDir: './src/modules/**/category.js',
  saveFilename: __dirname + '/category.js',
  files: [],
  timer: null,
  match: /modules\/(.*)\/category.js$/,
};
const store = {
  name: 'store',
  watchDir: './src/store/',
  saveFilename: __dirname + '/store.js',
  files: [],
  timer: null,
  match: /store\/(.*).js$/,
};

function fileTemplate(obj) {
  let data = '';
  obj.files.forEach((item) => {
    try {
      let filename = item.match(obj.match)[1];
      filename = filename.replace(/\/|\./, '_');
      data += `
  ${filename}: require('../../${item}'),`;
    } catch (e) {
      console.error(item, e);
    }
  });
  data = `export default {${data}
};
`;
  console.log(`save: ${obj.saveFilename}`);
  fs.writeFileSync(obj.saveFilename, data);
}
function writeFile(obj) {
  clearTimeout(obj.timer);
  obj.timer = setTimeout(() => {
    fileTemplate(obj);
  }, 400);
}
function runWatch(obj) {
  chokidar.watch(obj.watchDir, {
    persistent: true,
    atomic: false,
    ignorePermissionErrors: true,
    usePolling: true,
    interval: 100,
    awaitWriteFinish: {
      stabilityThreshold: 1000,
      // pollInterval: 1000,
    },
  })
    .on('add', (path) => {
      if (/(^|[\/\\])\../.test(path)) return;
      obj.files.push(path);
      writeFile(obj);
    })
    .on('unlink', (path) => {
      if (/(^|[\/\\])\../.test(path)) return;
      const index = obj.files.indexOf(path);
      if (index >= 0) {
        obj.files.splice(index, 1);
        writeFile(obj);
      }
    });
}
runWatch(listener);
runWatch(middleware);
runWatch(store);
runWatch(routes);
runWatch(category);
