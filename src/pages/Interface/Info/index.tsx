import {PageContainer, ProColumns, ProTable} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {Button, Card, Descriptions, message, Image, Input, Result, Progress, Skeleton} from 'antd';

import {useModel, useParams} from '@@/exports';
import {
  getInterfaceInfoByIdUsingPOST, invokeInterfaceInfoUsingPOST,
} from "@/services/pointapi_backend/interfaceController";
import {history, Link} from '@umijs/max';
import {
  addUserInterfaceInfoUsingPOST,
  getUserInterfaceInfoByIdsUsingPOST
} from "@/services/pointapi_backend/userInterfaceInfoController";
import {Text} from "antd-mobile-alita";
import {ApiFilled, ApiTwoTone} from "@ant-design/icons";

interface DataType {
  key: string,
  value: any,
}

function isImageUrl(url: any) {
  const imageExtensions = /\.(jpeg|jpg|gif|png|svg)$/i;
  return imageExtensions.test(url);
}

const Index: React.FC = () => {

  const [loading, setLoading] = useState(false);
  //
  const [interfaceInfo, setInterfaceInfo] = useState<API.InterfaceInfo>();
  const [userInterfaceInfo, setUserInterfaceInfo] = useState<API.UserInterfaceInfo>();
  const [requestParams, setRequestParams] = useState<DataType[]>([{key: '', value: ''}]);
  const [invokeRes, setInvokeRes] = useState<any>();
  const [invokeLoading, setInvokeLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [UserInterfaceOffHidden, setUserInterfaceOffHidden] = useState(false)
  const [interfaceResultHidden, setInterfaceResultHidden] = useState(true)
  const [skeletonLoading, setSkeletonLoading] = useState(true)
  const {initialState, setInitialState} = useModel('@@initialState');

  const params = useParams();
  const [dataSource, setDataSource] = useState<DataType[]>();
  /**
   * 查询接口信息
   */
  const loadInterfaceInfo = async () => {
    if (!params) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingPOST({...params} as API.IdRequest);
      setInterfaceInfo(res.data);
      if (res?.data?.requestParams) {
        const transformedArray = Object.entries(JSON.parse(res?.data?.requestParams)).map(([key, value]) => ({
          key,
          value,
        }));
        setRequestParams(transformedArray);
      }
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };

  /**
   * 查询用户和接口的关系
   */
  const loadUserInterfaceInfo = async () => {
    if (!params) {
      message.error('参数不存在');
      return;
    }
    try {
      const res = await getUserInterfaceInfoByIdsUsingPOST({
        userId: initialState?.loginUser?.id,
        interfaceInfoId: params.id,
      });
      setUserInterfaceInfo(res.data);
      // console.log("res.data")
      // console.log(res.data)
      if (res.data !== null) {
        setUserInterfaceOffHidden(true)
      }
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
  };
  /**
   * 处理接口的开通申请和调用次数申请
   */
  const handleApplication = async () => {
    if (!params) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    try {
      const res = await addUserInterfaceInfoUsingPOST({
        userId: initialState?.loginUser?.id,
        interfaceInfoId: params.id,
      });
      loadUserInterfaceInfo();
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
  };

  useEffect(() => {
    loadInterfaceInfo();
    loadUserInterfaceInfo();
  }, []);

  const handleInterfaceRequest = async () => {
    setSkeletonLoading(true)
    // if (interfaceInfo?.requestParams === null) {
    //   console.log("interfaceInfo?.requestParams===null")
    // }
    // if (interfaceInfo?.requestParams === "") {
    //   console.log("interfaceInfo?.requestParams===")
    // }
    setInterfaceResultHidden(true)
    setButtonDisabled(true)
    // 调用接口
    console.log("params.id")
    console.log(params.id)
    console.log(Number(params.id))
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    // 将 dataSource 转换为对象
    const obj = {};
    //map循环方式
    dataSource?.map(async (temp) => {
      // console.log(temp.key);
      obj[temp.key] = temp.value;
    });
    // const obj = JSON.parse(dataSource as any) as {
    //   [key: string]: string[];
    // };
    // console.log("obj")
    // console.log(obj)
    const userRequestParams = JSON.stringify(obj)
    // console.log("userRequestParams")
    // console.log(userRequestParams)
    // 开始调用请求
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoUsingPOST({
        id: params.id,
        userRequestParams
      });
      setInvokeRes(res.data);
      message.success('请求成功');
      // TODO 请求修改调用次数的方法
      loadUserInterfaceInfo();
      setInterfaceResultHidden(false)
    } catch (error: any) {
      message.error('操作失败，' + error.message);
    }
    setInvokeLoading(false)
    setButtonDisabled(false)
    setSkeletonLoading(false)
  };

  const handleDataSourceChange = (key: string, value: any) => {
    const tempParam = requestParams.map((temp) => {
      if (temp.key === key) {
        temp.value = value;
        return temp;
      } else {
        return temp;
      }
    });
    setDataSource(tempParam);
  };
  const columns: ProColumns<DataType>[] = [
    {
      title: 'key',
      dataIndex: 'key',
      width: '30%'
    },
    {
      title: 'value',
      dataIndex: 'value',
      valueType: 'text',
      render: (_, record: DataType) => [
        <Input key={"config"} onChange={(e) => {
          handleDataSourceChange(record.key, e.target.value)
        }}>
        </Input>
      ],
    },
  ];
  return (
    <PageContainer title="接口信息">
      <Card>
        {interfaceInfo ? (
          <Descriptions title={interfaceInfo.name} column={1}>
            <Descriptions.Item label="接口状态">{interfaceInfo.status ? '开启' : '关闭'}</Descriptions.Item>
            <Descriptions.Item label="描述">{interfaceInfo.description}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{interfaceInfo.url}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{interfaceInfo.method}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{interfaceInfo.requestParams}</Descriptions.Item>
            <Descriptions.Item label="请求头">{interfaceInfo.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{interfaceInfo.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{interfaceInfo.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{interfaceInfo.updateTime}</Descriptions.Item>
          </Descriptions>
        ) : (
          <Result
            status="error"
            title="接口不存在"
            extra={
              <Button type="primary" key="console" onClick={() => {
                history.push("/")
              }}>
                返回首页
              </Button>
            }
          />
        )}
      </Card>
      <p></p>
      <Card title={"用户接口信息"} hidden={(!UserInterfaceOffHidden)}>
        <Descriptions column={3}>
          <Descriptions.Item>
            <Progress type="dashboard" percent={userInterfaceInfo?.leftNum}
                      strokeColor={{'0%': '#e3f308', '100%': '#39ff02'}}/>
          </Descriptions.Item>
          <Descriptions.Item>
            <Card style={{width: 300}}>
              <p>剩余调用次数: {userInterfaceInfo?.leftNum} 次</p>
              <p>总调用次数: {userInterfaceInfo?.totalNum} 次</p>
            </Card>
          </Descriptions.Item>
          <Descriptions.Item>
            <Button size={"large"} type="primary" key="console" onClick={handleApplication}>
              申请调用次数
            </Button>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card hidden={UserInterfaceOffHidden}>
        <Result
          title="暂未开通接口调用"
          extra={
            <Button size={"large"} type="primary" key="console" onClick={handleApplication}>
              向管理员申请调用
            </Button>
          }/>
      </Card>
      <p></p>
      <Card title="在线测试">
        <div hidden={interfaceInfo?.requestParams === null}>
          <ProTable
            options={false}
            bordered={true}
            columns={columns}
            dataSource={requestParams}
            search={false}
            showSorterTooltip={false}
            pagination={false}
            // actionRef={tableRef}
            rowKey="key"
          />
        </div>
        <Button type="primary" disabled={buttonDisabled} onClick={handleInterfaceRequest}>
          测试调用
        </Button>
        {/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
      </Card>
      <p></p>
      <Card title="返回结果" hidden={interfaceResultHidden}>
        <Card style={{height: '300px'}}>
          {isImageUrl(invokeRes) ? (
            <Image
              width={200}
              src={invokeRes}
            />
          ) : (
            <Text>
              {invokeRes}
            </Text>
          )}
        </Card>
      </Card>
      <Card title="返回结果" hidden={!interfaceResultHidden}>
        <Card style={{height: '300px'}}>
          <ApiTwoTone style={{fontSize: '100px', display: 'block', margin: 'auto', textAlign: 'center'}}/>
        </Card>
      </Card>
    </PageContainer>
  );
};

export default Index;
