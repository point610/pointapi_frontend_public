import {ProLayoutProps} from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  // 拂晓蓝
  navTheme: 'light',
  colorPrimary: '#1677FF',
  contentWidth: 'Fluid',
  fixedHeader: false,
  colorWeak: false,
  title: 'PointApi',
  pwa: true,
  logo: 'pro_icon.svg',
  iconfontUrl: '',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  },
  fixSiderbar: true,
  layout: "mix",
  splitMenus: true,
};

export default Settings;
