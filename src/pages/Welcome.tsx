import {PageContainer} from '@ant-design/pro-components';
import {Avatar, Card, Divider, List, theme} from 'antd';
import React, {useEffect, useState} from 'react';
import {listOnlineInterfaceVOUsingPOST} from "@/services/pointapi_backend/interfaceController";
import Meta from "antd/es/card/Meta";
import {history, useModel} from '@umijs/max';

const Welcome: React.FC = () => {
  const {token} = theme.useToken();
  const {initialState} = useModel('@@initialState');
  const [data, setData] = useState<API.InterfaceDisplayVo[]>();
  useEffect(() => {
    async function updateStudent() {
      const resp = await listOnlineInterfaceVOUsingPOST()
      setData(resp.data)
    }

    updateStudent()
  }, []);
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}>
        <div style={{
          backgroundPosition: '100% -30%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '274px auto',
          backgroundImage:
            "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
        }}>
          <div style={{
            fontSize: '20px',
            color: token.colorTextHeading,
          }}> 欢迎使用 PointApi
          </div>
          <p style={{
            fontSize: '14px',
            color: token.colorTextSecondary,
            lineHeight: '22px',
            marginTop: 16,
            marginBottom: 32,
            width: '65%',
          }}>
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
          }}>
            <List
              grid={{gutter: 16, column: 3}}
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <Card style={{marginTop: 16, height: 120, background: '#d9e7f8'}}
                        hoverable
                    // cover={<img alt="example" src="/adminAvatar.png"/>}
                        onClick={() => {
                          // TODO 需要显示接口or跳转到接口页面
                          console.log("item.id")
                          console.log(item.id)
                          const apiLink = `/interface_info/${item.id}`;
                          history.push(apiLink)
                          // console.log(66666)
                        }}>
                    <Meta
                      avatar={<Avatar size={"large"} src={item.interfaceImg}/>}
                      title={item.name}
                      description={<div style={{
                        lineHeight: '1.5',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2
                      }}>{item.description}</div>}
                    />
                  </Card>
                </List.Item>
              )}
            />
            {/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
