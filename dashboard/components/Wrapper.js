import Head from 'next/head'
import Navbar from './Navbar'
import { Layout } from 'antd'

const { Content, Footer } = Layout

const Wrapper = (props) => (
  <div>
    <Head>
      <title>{props.title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout style={{ minHeight: '100vh' }}>
      {props.noNav ? '' : <Navbar />}
      <Layout>
        <Content style={{ margin: '30px' }}>{props.children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          COM3610 NodeJS Farming Devices Dashboard <br></br> Created by Nikolay
          Lyubomirov
        </Footer>
      </Layout>
    </Layout>
  </div>
)

export default Wrapper
