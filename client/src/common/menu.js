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
      {
        name: '消息管理',
        path: 'manage_message',
      },
      // {
      //   name: '自定义菜单管理',
      //   path: 'workplace',
      // },
      {
        name: '自动回复管理',
        path: 'auto-response',
        children: [
          {
            name: '关注自动回复',
            path: 'follow',
          },
          {
            name: '默认自动回复',
            path: 'default',
          },
          {
            name: '关键词自动回复',
            path: 'keyword',
          },
        ],
      },
      {
        name: '素材管理',
        path: 'manage_material',
        children: [
          {
            name: '图文素材',
            path: 'article',
          },
          {
            name: '图片素材',
            path: 'picture',
          },
          {
            name: '排版素材',
            path: 'composition',
          },
        ],
      },
      {
        name: '二维码管理',
        path: 'manage_qr',
      },
      {
        name: '标签规则管理',
        path: 'manage_tag',
      },
      {
        name: '运营数据统计',
        path: 'analysis',
        children: [
          {
            name: '用户统计',
            path: 'user',
          },
          {
            name: '互动统计',
            path: 'interactive',
          },
          {
            name: '图文统计',
            path: 'article',
          },
          {
            name: '二维码统计',
            path: 'qr',
          },
        ],
      },
    ],
  },
  {
    name: '客户管理',
    icon: 'profile',
    path: 'customer',
    children: [
      {
        name: '客户列表',
        path: 'list',
      },
    ],
  },
  {
    name: '营销中心',
    icon: 'form',
    path: 'marketing',
    children: [
      {
        name: '应用表格',
        path: 'application_form',
      },
    ],
  },
  {
    name: 'dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '分析页',
        path: 'analysis',
      },
      {
        name: '监控页',
        path: 'monitor',
      },
      {
        name: '工作台',
        path: 'workplace',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
  {
    name: '表单页',
    icon: 'form',
    path: 'form',
    children: [
      {
        name: '基础表单',
        path: 'basic-form',
      },
      {
        name: '分步表单',
        path: 'step-form',
      },
      {
        name: '高级表单',
        authority: 'admin',
        path: 'advanced-form',
      },
    ],
  },
  {
    name: '列表页',
    icon: 'table',
    path: 'list',
    children: [
      {
        name: '查询表格',
        path: 'table-list',
      },
      {
        name: '标准列表',
        path: 'basic-list',
      },
      {
        name: '卡片列表',
        path: 'card-list',
      },
      {
        name: '搜索列表',
        path: 'search',
        children: [
          {
            name: '搜索列表（文章）',
            path: 'articles',
          },
          {
            name: '搜索列表（项目）',
            path: 'projects',
          },
          {
            name: '搜索列表（应用）',
            path: 'applications',
          },
        ],
      },
    ],
  },
  {
    name: '详情页',
    icon: 'profile',
    path: 'profile',
    children: [
      {
        name: '基础详情页',
        path: 'basic',
      },
      {
        name: '高级详情页',
        path: 'advanced',
        authority: 'admin',
      },
    ],
  },
  {
    name: '结果页',
    icon: 'check-circle-o',
    path: 'result',
    children: [
      {
        name: '成功',
        path: 'success',
      },
      {
        name: '失败',
        path: 'fail',
      },
    ],
  },
  {
    name: '异常页',
    icon: 'warning',
    path: 'exception',
    children: [
      {
        name: '403',
        path: '403',
      },
      {
        name: '404',
        path: '404',
      },
      {
        name: '500',
        path: '500',
      },
      {
        name: '触发异常',
        path: 'trigger',
        hideInMenu: true,
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
