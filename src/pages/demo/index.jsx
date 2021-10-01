import { Button, Popconfirm, message } from "antd";
import { DragSortTable } from '@ant-design/pro-table'
import { useModel, useHistory } from 'umi'

export default function MyTable() {
  const history = useHistory()
  const { list, updateList, removeById } = useModel('demo', ret => ({
    list: ret.list,
    updateList: ret.updateList,
    removeById: ret.removeById
  }))

  // table data source and column config
  const columns = [
    {
      title: "",
      dataIndex: "sort",
      width: 30,
      className: 'drag-visible',
    },
    {
      title: "Name",
      dataIndex: "name",
      className: 'drag-visible',
      key: "name"
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button type="primary" style={{ marginRight: "20px" }} onClick={() => requestEditItem(record)}>
            Edit
					</Button>
          <Popconfirm
            placement="rightTop"
            title='Are you sure delete this row?'
            onConfirm={() => remove(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>
              Delete
					</Button>

          </Popconfirm>
        </div>
      )
    }
  ];

  // handle drag sort
  const onSortEnd = (newList) => {
    updateList(newList)
  }

  // delte row
  const remove = (id) => {
    removeById(id)
    message.success({ content: 'Delete item successfully!' })
  };

  // show new item editor
  const requestCreateItem = () => {
    history.push('/demo/new')
  }

  // show edit item editor
  const requestEditItem = (item) => {
    history.push(`/demo/${item.id}`)
  }

  return (
    <div style={{ padding: "20px" }}>
      <Button
        style={{ marginBottom: "10px", marginRight: "100%" }}
        onClick={() => requestCreateItem()}
      >
        New Item
			</Button>

      <DragSortTable
        search={false}
        rowKey="id"
        dataSource={list}
        columns={columns}
        dragSortKey="sort"
        onDragSortEnd={onSortEnd}
      />;
    </div>
  );
}
