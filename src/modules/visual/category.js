import http from 'core/http';
import store from 'core/store';

const rootPath = '/visual';
const category = {
  view: {
    title: '业务视图',
    path: `${rootPath}/view`,
    icon: 'el-icon-notebook-1',
    children: [],
  },
  myview: {
    title: '我的视图',
    path: `${rootPath}/myview`,
    icon: 'el-icon-notebook-2',
    children: [{
      title: '我的视图管理',
      path: `${rootPath}/manage/myview`,
      icon: 'el-icon-files',
    }],
  },
  manage: {
    title: '系统管理',
    path: `${rootPath}/manage`,
    icon: 'el-icon-s-tools',
    children: [
      {
        title: '业务视图管理',
        icon: 'el-icon-files',
        path: `${rootPath}/manage/view`,
      },
      {
        title: '组件管理',
        icon: 'el-icon-coin',
        path: `${rootPath}/manage/item`,
      },
    ],
  },
};
const fetch = async (type, isMerge = true) => {
  let menu = [];
  try {
    const { data } = await http.get(`/${type}`, {});
    if (data.status !== 'OK') throw new Error();
    const enabledData = data.data.filter(item => (item.isEnabled - 0) === 1);
    menu = enabledData.map(item => ({
      title: item.title,
      icon: 'el-icon-s-marketing',
      path: `${rootPath}/${type}/${item.id}`,
    }));
  } catch (e) {
    console.error(e);
  }
  if (!isMerge) return menu;
  if (type === 'view') {
    category[type].children = menu;
  } else {
    const { children } = category[type];
    category[type].children = [...menu, children.slice(-1)[0]];
  }
  return true;
};

// const menu = async (type) => {
//   const allPromise = [];
//   if (!type) {
//     allPromise.push(fetch('view'));
//     allPromise.push(fetch('myview'));
//   } else {
//     allPromise.push(fetch(type));
//   }
//   await http.get('/user_menu/apiuser1', {});
//   await Promise.all(allPromise);
//   const menus = Object.keys(category).map(key => category[key]);
//   return menus;
// };
// export default menu;

export default async function fetchMenu() {
  let menus = [];
  try {
    const { data } = await http.get(`/user_menu/${store.state.userinfo.user_code}`);
    if (data.status !== 'OK') throw new Error();
    const recursionMenu = items => items.map((item) => {
      if (item.subMenus && item.subMenus.length) {
        item.children = recursionMenu(item.subMenus);
      }
      return Object.assign(item, {
        id: item.id,
        title: item.title || item.comment,
        path: item.path || item.uri,
      });
    });
    menus = recursionMenu(data.data);
    const myview = await fetch('myview', false);
    menus.forEach((item) => {
      if (item.code === 'menu.myview') {
        item.children = [...myview, item.children.slice(-1)[0]];
      }
    });
  } catch (e) {
    console.error(e);
  }
  return menus;
}
