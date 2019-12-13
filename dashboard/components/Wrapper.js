import Navbar from './Navbar'
import HeaderAlpha from './Header'
import { Layout } from 'antd'

const { Content, Footer } = Layout

const Wrapper = props => (
  <div>
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Layout>
        <HeaderAlpha />
        <Content style={{ margin: '0 30px' }}>{props.children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  </div>
)

export default Wrapper
