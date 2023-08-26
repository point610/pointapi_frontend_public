import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import {FormattedMessage} from '@umijs/max';
import {Button, message, Popconfirm, Switch} from 'antd';
import React, {useRef, useState} from 'react';

import UpdateModal from "@/pages/Interface/Manage/components/UpdateModal";
import CreateModal from "@/pages/Interface/Manage/components/CreateModal";
import {
  addInterfaceInfoUsingPOST,
  deleteInterfacesUsingPOST,
  deleteInterfaceUsingPOST,
  listInterfaceInfoUsingPOST,
  offlineInterfaceUsingPOST,
  onlineInterfaceUsingPOST,
  updateInterfaceUsingPOST
} from "@/services/pointapi_backend/interfaceController";


const TableList: React.FC = () => {
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [showDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfo[]>([]);
  const handleAdd = async (fields: API.InterfaceInfo) => {
    const hide = message.loading('正在添加...');
    try {
      await addInterfaceInfoUsingPOST({...fields} as API.InterfaceInfoAddRequest);
      hide();
      message.success('添加成功!');
      setCreateModalVisible(false)
      actionRef.current?.reload()
      return true;
    } catch (error: any) {
      hide();
      message.error('添加失败！' + error.message);
      return false;
    }
  };
  const handleUpdate = async (fields: API.InterfaceInfo) => {
    if (!currentRow) {
      return;
    }
    const hide = message.loading('修改中');
    try {
      await updateInterfaceUsingPOST({
        id: currentRow.id,
        ...fields
      });
      hide();
      message.success('操作成功');
      actionRef.current?.reload()
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败，' + error.message);
      return false;
    }
  };
  const handleRemove = async (record: API.InterfaceInfo) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteInterfaceUsingPOST({id: record.id});
      hide();
      message.success('删除成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败，' + error.message);
      return false;
    }
  };
  const handleRemoveBatchByIds = async (record: API.InterfaceInfo[]) => {
    const hide = message.loading('正在删除...');
    if (!record) return true;
    try {
      const newPeople: { id: number | undefined }[] = record.map((temp) => ({id: temp.id}));
      await deleteInterfacesUsingPOST(newPeople);
      hide();
      message.success('删除成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败，' + error.message);
      return false;
    }
  };
  const interfaceOnline = async (fields: API.InterfaceInfo) => {
    const hide = message.loading('正在上线...');
    try {
      await onlineInterfaceUsingPOST({...fields} as API.IdRequest);
      hide();
      message.success('上线成功!');
      actionRef.current?.reload()
      return true;
    } catch (error: any) {
      hide();
      message.error('上线！' + error.message);
      return false;
    }
  };
  const interfaceOffline = async (fields: API.InterfaceInfo) => {
    const hide = message.loading('正在下线...');
    try {
      // console.log("{...fields} as API.IdRequest")
      // console.log(fields)
      // console.log({...fields} as API.IdRequest)
      await offlineInterfaceUsingPOST({...fields} as API.IdRequest);
      hide();
      message.success('下线成功!');
      actionRef.current?.reload()
      return true;
    } catch (error: any) {
      hide();
      message.error('下线失败！' + error.message);
      return false;
    }
  };


  const columns: ProColumns<API.InterfaceInfo>[] = [
    {
      title: 'ID',
      align: "center",
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true, width: 50,
      formItemProps: {
        rules: [{
          required: true,
        }]
      }
    },
    {
      title: '名称',
      align: "center", width: 100,
      dataIndex: 'name',
    },
    {
      title: '描述',
      align: "center", width: 100,
      dataIndex: 'description',
      valueType: 'text',
    },
    {
      title: '请求路径', width: 150,
      align: "center",
      dataIndex: 'url',
      valueType: 'textarea',
    }, {
      title: '接口图片',
      width: 150,
      align: "center",
      dataIndex: 'interfaceImg',
      render: (_, record) => (
        <img src={record.interfaceImg} alt="Item Image" style={{width: '100px', height: 'auto'}}/>
      ),
    },
    {
      title: '状态',
      align: "center",
      width: 100,
      fixed: 'right',
      dataIndex: 'status',
      valueType: 'text',
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Processing',
        },
        1: {
          text: '开启',
          status: 'Default',
        },
      },
      render: (_, record) => [
        <Switch key="config" defaultChecked={record.status === 1}
                onChange={(checked) => {
                  if (!checked) {
                    interfaceOffline(record)
                  } else {
                    interfaceOnline(record)
                  }
                }}
                checkedChildren={'开启'}
                unCheckedChildren={'关闭'}/>,
      ],
    }, {
      title: '请求方法',
      align: "center", width: 100,
      dataIndex: 'method',
      valueType: 'text',
    },
    {
      title: '请求头',
      align: "center", width: 250,
      dataIndex: 'requestHeader',
      valueType: 'jsonCode',
    },
    {
      title: '请求参数',
      align: "center", width: 150,
      dataIndex: 'requestParams',
      valueType: 'jsonCode',
    },
    {
      title: '响应头',
      align: "center", width: 250,
      dataIndex: 'responseHeader',
      valueType: 'jsonCode',
    },

    {
      title: '操作',
      align: "center", width: 150,
      fixed: 'right',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button key="config" type="link" onClick={() => {
          setUpdateModalVisible(true);
          setCurrentRow(record);
        }}>
          修改
        </Button>,
        <Popconfirm
          key="config"
          title="确认要删除吗？"
          onConfirm={
            async () => {
              handleRemove(record);
            }
          }
          okText="确认"
          cancelText="取消">
          <Button danger type="text">
            删除
          </Button>
        </Popconfirm>,

      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.InterfaceInfo, API.PageParams>
        scroll={{x: 1700}}
        headerTitle={'接口列表'}
        actionRef={actionRef}
        rowKey="id"
        search={{labelWidth: 120,}}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}>
            <PlusOutlined/> <FormattedMessage id="pages.searchTable.new" defaultMessage="添加接口"/>
          </Button>,
        ]}
        request={async (params) => {
          const res: any = await listInterfaceInfoUsingPOST({
            ...params,
          });
          if (res?.data) {
            return {
              data: res?.data.records || [],
              success: true,
              total: res?.data.total || 0,
            };
          } else {
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div> 已选择{' '}
              <a style={{fontWeight: 600,}}>
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
            </div>
          }>
          <Popconfirm
            title="确认要删除吗？"
            onConfirm={
              async () => {
                await handleRemoveBatchByIds(selectedRowsState);
                setSelectedRows([]);
                actionRef.current?.reloadAndRest?.();
              }
            }
            okText="确认"
            cancelText="取消">
            <Button> 批量删除 </Button>
          </Popconfirm>
          {/*<Button type="primary">批量审批</Button>*/}
        </FooterToolbar>
      )}

      <UpdateModal
        columns={columns}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            setUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          setUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        visible={updateModalVisible}
        values={currentRow || {}}
      />
      <CreateModal
        columns={columns}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
        onSubmit={async (values) => {
          handleAdd(values);
        }}
        visible={createModalVisible}
      />
    </PageContainer>
  );
};

export default TableList;
