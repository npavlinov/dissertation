import React from 'react'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import { Layout, Breadcrumb } from 'antd'
import 'antd/dist/antd.css'
import Wrapper from '../../components/Wrapper'

const { Header, Content, Footer } = Layout

export default function Devices() {
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
