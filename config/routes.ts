export default [
  {
    name: '登录',
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login', component: './User/Login'
      },
      {
        path: '/user/fgpw', component: './User/Login/forgetPassword'
      },
      {
        path: '/user/register', component: './User/Login/register'
      }
    ]
  },
  // {name: '设置页面', path: '/user', layout: false, routes: [{path: '/user/settings', component: './User/Center'}]},
  {name: '首页', path: '/welcome', icon: 'smile', component: './Welcome'},

  {name: '开发者社区', path: '/devcommunity/post', icon: 'UsergroupAddOutlined', component: './DeveloperCommunity/Post/index'},

  {name: '个人中心', icon: 'user', path: '/user/center', component: './User/Center'},
  // 配置接口信息页面的路径
  {path: '/interface_info/:id', name: '查看接口', icon: 'smile', component: './Interface/Info', hideInMenu: true},
  {
    name: '管理模块',
    icon: 'table',
    path: '/manage',
    access: 'canAdmin',
    routes: [
      {
        access: 'canAdmin',
        name: '用户管理',
        path: '/manage/user',
        component: './User/Manage/index'
      },
      {
        access: 'canAdmin',
        name: '接口管理',
        path: '/manage/interface',
        component: './Interface/Manage/index'
      }, {
        access: 'canAdmin',
        name: '帖子管理',
        path: '/manage/devcommunity',
        component: './DeveloperCommunity/Manage/index'
      },
      {
        access: 'canAdmin',
        name: '用户接口管理',
        path: '/manage/userinterface',
        component: './UserInterface/Manage/index'
      },
    ]
  }, {
    name: '分析模块',
    icon: 'table',
    path: '/analysis',
    access: 'canAdmin',
    routes: [
      {
        access: 'canAdmin',
        name: '用户接口分析',
        path: '/analysis/userinterface',
        component: './UserInterface/Analysis/index'
      },
    ]
  },
  {path: '/', redirect: '/welcome'},
  {path: '*', layout: false, component: './404'},
];
