import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '运营管理',
    icon: 'dashboard',
    path: 'operation',
    children: [
      {
        name: '运营数据概览',
        path: 'overview',
      },
    ],
  },
  {
    name: '客户管理',
    icon: 'profile',
    path: 'customer',
    children: [
      {
        name: '客户数据概览',
        path: 'overview',
      },
      {
        name: '客户列表',
        path: 'list',
      },
    ],
  },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
