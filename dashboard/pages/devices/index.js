import React from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import { Table, Button, Typography, Badge, Tooltip, Space } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import Wrapper from '../../components/Wrapper'
import WithAuth from '../../components/WithAuth'
import notification from '../../utils/notification'

import { checkToken } from '../../utils/auth'

const { Title } = Typography
const { publicRuntimeConfig } = getConfig()

const columns = [
  {
    title: 'ID',
    dataIndex: 'key',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Connected',
    dataIndex: 'connected',
    key: 'connected',
    render: (text, record) =>
      record.connected ? (
        <div>
          <Badge status="success" />
          Connected
        </div>
      ) : (
        <div>
          <Badge status="error" />
          Not Connected
        </div>
      ),
  },
  {
    title: 'Fetch Time',
    dataIndex: 'fetchTime',
    key: 'fetchTime',
    render: (text, record) => <div>{text / 60} min</div>,
  },
  {
    title: 'IP',
    dataIndex: 'ip',
    key: 'ip',
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: (text, record) => (
      <Space>
        <Tooltip title="edit">
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            href={`/devices/${record.id}`}
          />
        </Tooltip>
        <Tooltip title="delete">
          <Button
            danger
            type="primary"
            shape="circle"
            icon={<DeleteOutlined />}
          />
        </Tooltip>
      </Space>
    ),
  },
]

const Devices = (props) => {
  console.log(props.devices)
  return (
    <div>
      <Head>
        <title>Devices</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Title level={2}>Devices</Title>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" icon={<PlusOutlined />} href="/devices/create">
            Add
          </Button>
        </div>
        <Table dataSource={props.devices} columns={columns} />
      </Wrapper>
    </div>
  )
}

Devices.getInitialProps = async function (ctx) {
  try {
    const token = checkToken(ctx)
    const res = await fetch(`${publicRuntimeConfig.API_URL}/api/devices/user`, {
      method: 'GET',
      credentials: 'include',
      headers: { Authorization: token },
    })
    const devices = await res.json()
    const returnDevices = devices.map((device, index) => {
      return {
        ...device,
        key: index + 1,
      }
    })

    if (res.status === 200) {
      return {
        devices: returnDevices,
      }
    } else {
      const { message } = data
      if (process.browser) {
        notification('error', message)
      }
    }
  } catch (err) {
    console.log(err)
  }
}

export default WithAuth(Devices)
