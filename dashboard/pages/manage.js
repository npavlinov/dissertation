import React, { useState } from 'react'
import useSWR, { mutate } from 'swr'
import getConfig from 'next/config'
import WithAuth from '../components/WithAuth'
import Wrapper from '../components/Wrapper'
import Loading from '../components/Loading'
import notification from '../utils/notification'
import fetcher from '../utils/fetcher'
import fetch from 'isomorphic-unfetch'
import {
  Row,
  Col,
  Typography,
  Statistic,
  Button,
  Modal,
  Form,
  Input,
  Card,
} from 'antd'
import {
  ExperimentOutlined,
  ControlOutlined,
  FireOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons'

const { publicRuntimeConfig } = getConfig()
const { Title } = Typography

const Manage = (props) => {
  const [form] = Form.useForm()
  const [modalSettings, setModalSettings] = useState({
    visible: false,
    deviceId: null,
  })

  const { data: devices } = useSWR(
    [`${publicRuntimeConfig.API_URL}/api/devices`, 'GET', props.token],
    fetcher
  )

  const { data: settings } = useSWR(
    [`${publicRuntimeConfig.API_URL}/api/settings`, 'GET', props.token],
    fetcher
  )

  const { data: devicesData } = useSWR(
    [`${publicRuntimeConfig.API_URL}/api/data?limit=1`, 'GET', props.token],
    fetcher
  )

  if (!devices || !devicesData || !settings) {
    return <Loading />
  }

  const sendSetting = async (setting) => {
    try {
      const res = await fetch(`${publicRuntimeConfig.API_URL}/api/sockets`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: props.token,
        },
        body: JSON.stringify(setting),
      })

      if (res.status === 200) {
        notification('success', 'Setting Sent!')
      } else {
        notification('error', 'Something went wrong!')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const removeSetting = async (id) => {
    try {
      const res = await fetch(
        `${publicRuntimeConfig.API_URL}/api/settings/${id}`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: { Authorization: props.token },
        }
      )
      const resJson = await res.json()

      const { message } = resJson
      if (res.status === 200) {
        mutate([
          `${publicRuntimeConfig.API_URL}/api/settings`,
          'GET',
          props.token,
        ])
        notification('success', message)
      } else {
        notification('error', message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const submitSetting = async () => {
    try {
      const values = await form.validateFields()
      values.deviceId = modalSettings.deviceId
      form.resetFields()
      const res = await fetch(`${publicRuntimeConfig.API_URL}/api/settings`, {
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
        mutate([
          `${publicRuntimeConfig.API_URL}/api/settings`,
          'GET',
          props.token,
        ])
      } else {
        notification('error', message)
      }
      setModalSettings({
        ...modalSettings,
        visible: false,
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Wrapper title="Manage Devices">
      {devices.map((device, i) => (
        <div>
          <Row>
            <Col span={12}>
              <Title level={3} style={{ fontWeight: '500', lineHeight: 3 }}>
                {device.name}
              </Title>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={6}>
                  <Statistic
                    title="pH"
                    value={devicesData[i].length ? devicesData[i][0].pH : '-'}
                    prefix={<ExperimentOutlined />}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="Water levels"
                    value={
                      devicesData[i].length
                        ? devicesData[i][0].waterLevels
                        : '-'
                    }
                    prefix={<ControlOutlined />}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="Water temp."
                    value={
                      devicesData[i].length
                        ? devicesData[i][0].waterTemperature
                        : '-'
                    }
                    prefix={<FireOutlined />}
                    suffix="&#176;C"
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="Air temp."
                    value={
                      devicesData[i].length
                        ? devicesData[i][0].airTemperature
                        : '-'
                    }
                    prefix={<FireOutlined />}
                    suffix="&#176;C"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            {settings
              .filter((setting) => setting.Device.id === device.id)
              .map((setting) => (
                <Col span={4}>
                  <Card
                    style={{
                      height: 150,
                      width: 250,
                    }}
                    type="primary"
                  >
                    <Row justify="center">
                      <p>
                        <SettingOutlined />
                        &nbsp;
                        {setting.message}
                      </p>
                    </Row>
                    <Row gutter={16} style={{ margin: 0 }} justify="center">
                      <Col>
                        <Button
                          onClick={() => sendSetting(setting)}
                          type="primary"
                        >
                          Send
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          onClick={() => removeSetting(setting.id)}
                          type="primary"
                          danger
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            <Col span={4}>
              <Button
                style={{
                  height: 150,
                  width: 250,
                  background: 'none',
                  border: '1px dashed',
                }}
                onClick={() =>
                  setModalSettings({
                    ...modalSettings,
                    deviceId: device.id,
                    visible: true,
                  })
                }
                icon={<PlusOutlined />}
              >
                Add setting
              </Button>
            </Col>
          </Row>
        </div>
      ))}
      <Modal
        visible={modalSettings.visible}
        title="Add Setting"
        okText="Add"
        cancelText="Cancel"
        onCancel={() =>
          setModalSettings({
            ...modalSettings,
            visible: false,
          })
        }
        onOk={submitSetting}
      >
        <Form form={form} layout="vertical" name="form-add-setting">
          <Form.Item
            name="message"
            help="The message that will be send to the device."
            label="Message"
            rules={[
              {
                required: true,
                message: 'Please input a message',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Wrapper>
  )
}

export default WithAuth(Manage)
