import {
  PieChartOutlined,
  MobileOutlined,
  UserOutlined,
} from '@ant-design/icons'

export default [
  {
    route: '/',
    name: 'Home',
    icon: <PieChartOutlined />,
  },
  {
    route: '/devices',
    name: 'Devices',
    icon: <MobileOutlined />,
  },
  {
    route: '/profile',
    name: 'Profile',
    icon: <UserOutlined />,
  },
]
