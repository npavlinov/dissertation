import {
  PieChartOutlined,
  MobileOutlined,
  UserOutlined,
  DashboardOutlined,
  ControlOutlined,
} from '@ant-design/icons'

export default [
  {
    route: '/',
    name: 'Home',
    icon: <DashboardOutlined />,
  },
  {
    route: '/devices',
    name: 'Devices',
    icon: <MobileOutlined />,
  },
  {
    route: '/statistics',
    name: 'Statistics',
    icon: <PieChartOutlined />,
  },
  {
    route: '/manage',
    name: 'Manage',
    icon: <ControlOutlined />,
  },
]
