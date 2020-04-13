import React from 'react'
import Head from 'next/head'
import { Layout, Breadcrumb } from 'antd'
import 'antd/dist/antd.css'
import Wrapper from '../components/Wrapper'
import WithAuth from '../components/WithAuth'

const { Header, Content, Footer } = Layout

const Devices = () => {
  return (
    <div>
      <Head>
        <title>Devices</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          Devices.
        </div>
      </Wrapper>
    </div>
  )
}

export default WithAuth(Devices)
