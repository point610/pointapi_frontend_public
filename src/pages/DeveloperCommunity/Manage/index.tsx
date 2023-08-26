import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import {FormattedMessage} from '@umijs/max';
import {Button, message, Popconfirm,} from 'antd';
import React, {useRef, useState} from 'react';

import UpdateModal from "@/pages/DeveloperCommunity/Manage/components/UpdateModal";
import CreateModal from "@/pages/DeveloperCommunity/Manage/components/CreateModal";
import {
  addPostUsingPOST,
  deletePostsUsingPOST,
  deletePostUsingPOST, listPostVOByPageUsingPOST,
  updatePostUsingPOST
} from "@/services/pointapi_backend/postController";


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
  const [currentRow, setCurrentRow] = useState<API.PostVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.PostVO[]>([]);
  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.PostVO) => {
    const hide = message.loading('正在添加...');
    try {
      await addPostUsingPOST({...fields} as API.PostAddRequest);
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
  const handleUpdate = async (fields: API.PostVO) => {
    if (!currentRow) {
      return;
    }
    const hide = message.loading('修改中');
    try {
      await updatePostUsingPOST({
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
  const handleRemove = async (record: API.PostVO) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deletePostUsingPOST({id: record.id});
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
  const handleRemoveBatchByIds = async (record: API.PostVO[]) => {
    const hide = message.loading('正在删除...');
    if (!record) return true;
    try {
      const newPeople: { id: number | undefined }[] = record.map((temp) => ({id: temp.id}));
      await deletePostsUsingPOST(newPeople);
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
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const columns: ProColumns<API.PostVO>[] = [
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
      title: '标题',
      align: "center",
      width: 100,
      dataIndex: 'title',
    },
    {
      title: '内容',
      width: 150,
      align: "center",
      dataIndex: 'content',
      valueType: 'textarea',
    },
    {
      title: '作者id',
      align: "center", width: 150,
      dataIndex: 'userId',
      valueType: 'text',
    }, {
      title: '点赞数量',
      align: "center",
      width: 100,
      dataIndex: 'thumbNum',
      valueType: 'text',
    },
    {
      title: '收藏数量',
      align: "center", width: 250,
      dataIndex: 'favourNum',
      valueType: 'text',
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
      <ProTable<API.PostVO, API.PageParams>
        scroll={{x: 1700}}
        headerTitle={'帖子列表'}
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
            <PlusOutlined/> <FormattedMessage id="pages.searchTable.new" defaultMessage="添加帖子"/>
          </Button>,
        ]}

        request={async (params) => {
          const res: any = await listPostVOByPageUsingPOST({
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
