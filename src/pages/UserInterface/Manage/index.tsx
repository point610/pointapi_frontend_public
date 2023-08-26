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
  addUserInterfaceInfoUsingPOST,
  deleteUserInterfacesUsingPOST,
  deleteUserInterfaceUsingPOST,
  listUserInterfaceInfoUsingPOST, offUserInterfaceUsingPOST, onUserInterfaceUsingPOST,
  updateUserInterfaceUsingPOST
} from "@/services/pointapi_backend/userInterfaceInfoController";


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
  const [currentRow, setCurrentRow] = useState<API.UserInterfaceInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.UserInterfaceInfo[]>([]);
  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.UserInterfaceInfo) => {
    const hide = message.loading('正在添加...');
    try {
      await addUserInterfaceInfoUsingPOST({...fields} as API.UserInterfaceInfoAddRequest);
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

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.UserInterfaceInfo) => {
    if (!currentRow) {
      return;
    }
    const hide = message.loading('修改中');
    try {
      await updateUserInterfaceUsingPOST({
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

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async (record: API.UserInterfaceInfo) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteUserInterfaceUsingPOST({id: record.id});
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
  /**
   *  Delete node
   * @zh-CN 批量删除节点
   *
   * @param selectedRows
   */
  const handleRemoveBatchByIds = async (record: API.UserInterfaceInfo[]) => {
    const hide = message.loading('正在删除...');
    if (!record) return true;
    try {
      const newPeople: { id: number | undefined }[] = record.map((temp) => ({id: temp.id}));
      await deleteUserInterfacesUsingPOST(newPeople);
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
  const userInterfaceOn = async (fields: API.UserInterfaceInfo) => {
    const hide = message.loading('正在上线...');
    try {
      await onUserInterfaceUsingPOST({...fields} as API.IdRequest);
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
  const userInterfaceOff = async (fields: API.UserInterfaceInfo) => {
    const hide = message.loading('正在下线...');
    try {
      console.log("{...fields} as API.IdRequest")
      console.log(fields)
      console.log({...fields} as API.IdRequest)
      await offUserInterfaceUsingPOST({...fields} as API.IdRequest);
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

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const columns: ProColumns<API.UserInterfaceInfo>[] = [
    {
      title: 'ID',
      align: "center",
      dataIndex: 'id',
      valueType: 'text',
      fixed: 'right',
      hideInForm: true,
      formItemProps: {
        rules: [{
          required: true,
        }]
      }
    },
    {
      title: '用户ID',
      align: "center",
      fixed: 'right',
      dataIndex: 'userId',
    },
    {
      title: '接口ID',
      align: "center",
      fixed: 'right',
      dataIndex: 'interfaceInfoId',
      valueType: 'text',
    },
    {
      title: '剩余次数',
      align: "center",
      fixed: 'right',
      dataIndex: 'leftNum',
      valueType: 'text',
    },
    {
      title: '总调用次数',
      align: "center",
      fixed: 'right',
      dataIndex: 'totalNum',
      valueType: 'text',
    },
    {
      title: '状态',
      align: "center",
      fixed: 'right',
      dataIndex: 'status',
      hideInForm: true,
      valueType: 'text',
      valueEnum: {
        0: {
          text: '正常',
          status: 'Default',
        },
        1: {
          text: '禁用',
          status: 'Processing',
        },
      },
      render: (_, record) => [
        <Switch key="config" defaultChecked={record.status === 0}
                onChange={(checked) => {
                  if (!checked) {
                    userInterfaceOff(record)
                  } else {
                    userInterfaceOn(record)
                  }
                }}
                checkedChildren={'开启'}
                unCheckedChildren={'关闭'}/>,

      ],
    },
    {
      title: '操作',
      align: "center",
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
      <ProTable<API.UserInterfaceInfo, API.PageParams>
        // scroll={{x: 1700}}
        headerTitle={'用户接口关系列表'}
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
          const res: any = await listUserInterfaceInfoUsingPOST({
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
