import { Layout, Icon } from 'antd'
import Link from 'next/link'

const { Header } = Layout

export default function HeaderAlpha() {
  return (
    <Header
      style={{
        background: 'none',
        padding: '0 30px',
        textAlign: 'right',
      }}
    >
      <Link href="/account">
        <a>
          <Icon type="user" />
          <span> Account</span>
        </a>
      </Link>
    </Header>
  )
}
