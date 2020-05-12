import React from 'react'
import Router from 'next/router'
import { Form, Select, Input, Button, Row, Col } from 'antd'

const { Option } = Select

const layout = {
  wrapperCol: {
    span: 12,
  },
}

const validateMessages = {
  required: 'Please enter ${label} for your device!',
}

function DeviceForm(props) {
  const ipRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm

  const handleSubmit = async (values) => {
    await props.handleSubmit(values)
    Router.push('/devices')
  }

  return (
    <Row justify="center" style={{ margin: '30px 0' }}>
      <Col span={12}>
        <Form
          onFinish={handleSubmit}
          className="device-form"
          validateMessages={validateMessages}
          initialValues={
            props.device
              ? {
                  name: props.device.name,
                  ip: props.device.ip,
                  fetchTime: props.device.fetchTime.toString(),
                }
              : null
          }
        >
          <Form.Item name="name" rules={[{ required: true }]}>
            <Input
              data-cy="device-name"
              size="large"
              placeholder={props.device ? '' : 'Name'}
            />
          </Form.Item>
          <Form.Item
            name="ip"
            rules={[
              { required: true },
              {
                pattern: ipRegex,
                message: 'Please enter a valid IP address!',
              },
            ]}
          >
            <Input
              size="large"
              data-cy="device-ip"
              placeholder={props.device ? '' : 'IP'}
            />
          </Form.Item>
          <Form.Item
            data-cy="device-time"
            name="fetchTime"
            rules={[{ required: true }]}
          >
            <Select
              readOnly={false}
              size="large"
              placeholder={props.device ? '' : 'Fetch Time'}
            >
              <Option value="60">1 min</Option>
              <Option value="300">5 min</Option>
              <Option value="3600">1 hour</Option>
              <Option value="21600">6 hour</Option>
              <Option value="43200">12 hour</Option>
              <Option value="86400">24 hour</Option>
            </Select>
          </Form.Item>
          <Row justify="center">
            <Col span={24} style={{ textAlign: 'center' }}>
              <Button
                block
                size="large"
                type="primary"
                htmlType="submit"
                data-cy="device-submit"
                className="login-form-button"
              >
                {props.device ? 'Edit' : 'Add'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default DeviceForm
