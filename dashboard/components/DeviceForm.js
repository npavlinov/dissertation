import React from 'react'
import { Form, Select, Input, Button, Row, Col } from 'antd'
import notification from '../utils/notification'

const { Option } = Select

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
}

const validateMessages = {
  required: 'Please enter ${label} for your device!',
}

function DeviceForm(props) {
  const ipRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm

  const handleSubmit = async (values) => {
    try {
      const res = await fetch(`${props.config.API_URL}/api/devices/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: props.token,
        },
        body: JSON.stringify(values),
      })
      const { message } = await res.json()
      if (res.status === 200) {
        notification('success', message)
      } else {
        notification('error', message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Form
      {...layout}
      onFinish={handleSubmit}
      className="device-form"
      validateMessages={validateMessages}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input
          placeholder={props.device ? '' : 'Name'}
          defaultValue={props.device ? props.device.name : ''}
        />
      </Form.Item>
      <Form.Item
        name="ip"
        label="IP"
        rules={[
          { required: true },
          {
            pattern: ipRegex,
            message: 'Please enter a valid IP address!',
          },
        ]}
      >
        <Input
          placeholder={props.device ? '' : 'IP'}
          defaultValue={props.device ? props.device.ip : ''}
        />
      </Form.Item>
      <Form.Item
        name="fetchTime"
        label="Fetch Time"
        rules={[{ required: true }]}
      >
        <Select
          placeholder={props.device ? '' : 'Fetch Time'}
          defaultValue={props.device ? props.device.fetchTime : ''}
        >
          <Option value="60">1 min</Option>
          <Option value="300">5 min</Option>
          <Option value="3600">1 hour</Option>
          <Option value="21600">6 hour</Option>
          <Option value="43200">12 hour</Option>
          <Option value="86400">24 hour</Option>
        </Select>
      </Form.Item>
      <Row>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default DeviceForm
