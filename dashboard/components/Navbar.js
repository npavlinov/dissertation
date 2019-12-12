import React, { useState } from 'react'
import { Layout, Menu, Icon } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import routes from '../routes'

const { SubMenu } = Menu
const { Sider } = Layout

function Navbar() {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [selected, setSelected] = useState('1')

  const onCollapse = collapsed => {
    setCollapsed({ collapsed })
  }

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu theme="dark" selectedKeys={[router.pathname]} mode="inline">
        {routes.map((route, key) => (
          <Menu.Item key={route.route}>
            <Link href={route.route}>
              <a>
                <Icon type={route.icon} />
                <span>{route.name}</span>
              </a>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
      <style jsx>{`
        .logo {
          height: 32px;
          background: rgba(255, 255, 255, 0.2);
          margin: 16px;
        }
      `}</style>
    </Sider>
  )
}

export default Navbar
