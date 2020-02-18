import cookie from 'js-cookie'
import { Layout, Icon, Button } from 'antd'
import Link from 'next/link'
import { logout } from '../utils/auth'

const { Header } = Layout

export default function HeaderAlpha() {
  const token = cookie.get('token')
  return (
    <Header
      style={{
        background: 'none',
        padding: '0 30px',
        textAlign: 'right',
      }}
    >
      {' '}
      {token ? (
        <div>
          <Link href="/profile">
            <a>
              <Icon type="user" />
              <span> Profile</span>
            </a>
          </Link>
          <Button
            type="primary"
            ghost
            onClick={logout}
            style={{ margin: '0 0 0 15px' }}
          >
            <Icon type="logout" />
            <span> Logout</span>
          </Button>
        </div>
      ) : (
        <Link href="/login">
          <a>
            <Icon type="login" />
            <span> Login</span>
          </a>
        </Link>
      )}
    </Header>
  )
}
