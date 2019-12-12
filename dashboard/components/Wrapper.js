// import React from 'react'
import Navbar from './Navbar'
import { Layout } from 'antd'
// import 'antd/dist/antd.css'

const { Header, Content, Footer } = Layout

const Wrapper = props => (
  <div>
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '16px' }}>{props.children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  </div>
)

export default Wrapper
