import Navbar from './Navbar'
import { Layout } from 'antd'

const { Content, Footer } = Layout

const Wrapper = (props) => (
  <div>
    <Layout style={{ minHeight: '100vh' }}>
      {props.noNav ? '' : <Navbar />}
      <Layout>
        <Content style={{ margin: '0 30px' }}>{props.children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          COM3610 NodeJS Farming Devices Dashboard ©2020 <br></br> Created by
          Nikolay Lyubomirov
        </Footer>
      </Layout>
    </Layout>
  </div>
)

export default Wrapper
