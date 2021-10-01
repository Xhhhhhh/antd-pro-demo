import { Button, message ,Form, Input, InputNumber } from "antd";
import { useModel } from 'umi'
import * as R from 'ramda'
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

export default function Editor(props) {
  const { getById, create, updateById } = useModel('demo', (ret) => ({
    getById: ret.getById,
    create: ret.create,
    updateById: ret.updateById
  }))
  const id = props.match.params.id
  const [item, setItem] = useState(null)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    getItem(id)
  }, [])

  const getItem = (id) => {
    const data = getById(id)
    if (!R.isEmpty(data) && !R.isNil(data)) {
      setIsEdit(true)
    }
    setItem(data)
  }

  const history = useHistory()
  const onFinish = (values) => {
    if (isEdit) {
      updateById(id, values)
      message.success('Create successfully!')
    } else {
      create(values)
      message.success('Update successfully!')
    }
    history.push('/demo')
  }

  return (
    <div style={{ padding: '20px' }} key={item}>
      <Form onFinish={onFinish} initialValues={item} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
        <Form.Item label="Name" name="name" type="string" rules={[{ required: true, message: 'Please input your name' }, { max: 50 }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Age" name="age" rules={[{ required: true, message: 'Please input your age' }]}>
          <InputNumber min="0" max="200" />
        </Form.Item>

        <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input your address' }, { max: 150 }]}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
				</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
