import Mock from "mockjs";
export const getLocalStorage = (key) => {
  const json = localStorage.getItem(key);
  let data = null;
  try {
    data = JSON.parse(json);
  } catch (e) {
    data = json;
  }
  return data;
};
export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
const lastId = (table) => {
  let id = getLocalStorage(`${table}_lastId`);
  if (!id) return 1;
  else id = (id - 0) + 1;
  return id;
}
const saveLastId = (table, id) => setLocalStorage(`${table}_lastId`, id);
const getParamId = (url) => url.match(/\/(\d+)\/*/)[1] - 0;
const getParamTable = (url) => {
  let t = url.match(/\d+\/(\w+)\/*/)[1];
  return t.indexOf('view') >= 0 ? 'view' : t;
};
const returnJson = data => Object.assign({
  status: 'OK',
  code: '0',
  msg: '成功',
  time: null,
  data: null,
}, data);
Mock.mock(/\d+\/(view|myview|component|tier)/, 'post', function({body, url}) {
  const table = getParamTable(url);
  const db = getLocalStorage(table) || {};
  const data = JSON.parse(body);
  const id = lastId(table);
  db[id] = Object.assign(data, { id });
  setLocalStorage(table, db);
  saveLastId(table, id);
  return returnJson({data: id});
})
Mock.mock(/\d+\/(view|myview|component|tier)/, 'put', function({url, body}) {
  const table = getParamTable(url);
  const db = getLocalStorage(table) || {};
  const data = JSON.parse(body);
  const id = data.id;
  db[id] = Object.assign(db[id], data);
  setLocalStorage(table, db);
  return returnJson({});
})

Mock.mock(/\d+\/(view|myview|component|tier)/, 'delete', function({url, body}) {
  const table = getParamTable(url);
  const data = JSON.parse(body);
  const db = getLocalStorage(table) || {};
  data.forEach(id => delete db[id]);
  setLocalStorage(table, db);
  return returnJson({});
})
Mock.mock(/\d+\/(view|myview|component|tier)\/\d+/, 'get', function({url}) {
  const id = getParamId(url);
  const table = getParamTable(url);
  const db = getLocalStorage(table) || {};
  const data = db[id] || null;
  return returnJson({
    status: data ? 'OK' : 'error',
    data: data || null,
  });
})
Mock.mock(/\d+\/(view|myview|component)/, 'get', function({url}) {
  const table = getParamTable(url);
  const db = getLocalStorage(table) || {};
  let data = [];
  if (table === 'component') {
    data = Object.keys(db).map(k => db[k]);
  } else {
    const type = url.match(/\d+\/(\w+)\/*/)[1];
    Object.keys(db).forEach(k => {
      if (db[k].viewType === type) data.push(db[k]);
    });
  }
  return returnJson({ data: data || [] });
});
Mock.mock(/\d+\/tier\/(\w+)/, 'get', function({url}) {
  const table = 'tier';
  const tier = url.match(/\d+\/tier\/(\w+)/)[1];
  const db = getLocalStorage(table) || {};
  const data = [];
  Object.keys(db).forEach(k => {
    if (db[k].typeName === tier) data.push(db[k]);
  });
  return returnJson({ data: data || [] });
});
Mock.mock(/\d+\/uploadFile/, 'post', function(res) {
});
