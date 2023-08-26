import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'Point个人工作室',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Point Api',
          title: 'Point Api',
          href: 'https://blog.csdn.net/m0_62288512?type=blogn',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/point610',
          blankTarget: true,
        },
        {
          key: 'github',
          title: 'github',
          href: 'https://github.com/point610',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
