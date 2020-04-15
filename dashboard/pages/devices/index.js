import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import { Table, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import Wrapper from '../../components/Wrapper'
import WithAuth from '../../components/WithAuth'
import notification from '../../utils/notification'

import { checkToken } from '../../utils/auth'

const { publicRuntimeConfig } = getConfig()

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
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
    render: (text, record) => <a href={record.id}>Delete</a>,
  },
]

const Devices = ({ devices }) => {
  return (
    <div>
      <Head>
        <title>Devices</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" icon={<PlusOutlined />}>
            Add
          </Button>
        </div>
        <Table dataSource={devices} columns={columns} />
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
    if (res.status === 200) {
      return {
        props: {
          devices,
        },
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
