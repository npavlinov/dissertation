import {
  Card,
  Col,
  Row,
  Typography,
  Tabs,
  Statistic,
  Divider,
  Empty,
  List,
  Avatar,
} from 'antd'
import Link from 'next/link'
import Wrapper from '../components/Wrapper'
import WithAuth from '../components/WithAuth'
import Loading from '../components/Loading'

import getConfig from 'next/config'
import time from '../utils/time'
import { camelToNormal, addSuffix, addPrefix } from '../utils/convertText'
import fetcher from '../utils/fetcher'
import useSWR from 'swr'

import {
  UsbFilled,
  EditOutlined,
  ControlFilled,
  PieChartOutlined,
} from '@ant-design/icons'
const { Title } = Typography
const { TabPane } = Tabs
const { Meta } = Card

const { publicRuntimeConfig } = getConfig()

const Home = (props) => {
  // We need both of these calls, since some of the devices may not have data
  const { data: devices } = useSWR(
    [`${publicRuntimeConfig.API_URL}/api/devices`, 'GET', props.token],
    fetcher
  )

  const { data: devicesData } = useSWR(
    [`${publicRuntimeConfig.API_URL}/api/data?limit=3`, 'GET', props.token],
    fetcher
  )

  if (!devices || !devicesData) {
    return <Loading />
  }

  return (
    <div>
      <Wrapper title="Home">
        <Row gutter={16} style={{ marginTop: '50px' }}>
          <Col
            md={24}
            lg={8}
            style={{ textAlign: 'center' }}
            className="gutter-row"
          >
            <Title>Hello, {props.firstName}</Title>
            <Title level={3} style={{ fontWeight: '300' }}>
              This is your dashboard
            </Title>
          </Col>
          <Col md={24} lg={8} className="gutter-row">
            <Card
              bordered={false}
              actions={[
                <Link href="/devices">
                  <a>
                    <EditOutlined />
                    <span> Manage Devices</span>
                  </a>
                </Link>,
              ]}
            >
              <Row justify="center" gutter={16}>
                <Col>
                  <UsbFilled style={{ fontSize: '64px', color: '#011529' }} />
                </Col>
                <Col>
                  <Title level={3} style={{ lineHeight: 2 }}>
                    {devices.length} Devices
                  </Title>
                </Col>
                <Col>
                  <Title
                    level={3}
                    style={{
                      color: '#1890fe',
                      fontWeight: '400',
                      lineHeight: 2,
                    }}
                  >
                    ({devices.filter((device) => device.connected).length}{' '}
                    active)
                  </Title>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col sm={0} md={24} lg={8} className="gutter-row">
            <Card
              bordered={false}
              actions={[
                <Link href="/manage">
                  <a>
                    <EditOutlined />
                    <span> Manage controls</span>
                  </a>
                </Link>,
              ]}
            >
              <Row justify="center" gutter={16}>
                <Col>
                  <ControlFilled
                    style={{ fontSize: '64px', color: '#011529' }}
                  />
                </Col>
                <Col>
                  <Title level={2} style={{ lineHeight: 2 }}>
                    Manage
                  </Title>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ marginTop: '50px' }}
        >
          <Col sm={0} md={24} lg={8} className="gutter-row">
            <Card title="Last 3 received readings">
              <Tabs tabPosition="top">
                {devices.map((device, id) => (
                  <TabPane tab={device.name} key={device.id}>
                    <List
                      itemLayout="horizontal"
                      dataSource={devicesData[id]}
                      renderItem={(item) => (
                        <List.Item>
                          {Object.keys(item).map((reading) => (
                            <Statistic
                              suffix={addSuffix(reading)}
                              title={camelToNormal(reading)}
                              value={item[reading]}
                            />
                          ))}
                        </List.Item>
                      )}
                    />
                  </TabPane>
                ))}
              </Tabs>
            </Card>
          </Col>

          <Col md={24} lg={16} className="gutter-row">
            <Card
              actions={[
                <Link href={`/manage`}>
                  <a>
                    <PieChartOutlined />
                    <span> See Device Statistics</span>
                  </a>
                </Link>,
              ]}
            >
              <Tabs tabPosition="left" style={{ height: 305 }} size="large">
                {devices.map((device, id) => (
                  <TabPane tab={device.name} key={device.id}>
                    <Row
                      gutter={16}
                      style={{ textAlign: 'center', margin: '20px 0' }}
                    >
                      <Col span={8}>
                        <Statistic title="Device IP" value={device.ip} />
                      </Col>
                      <Col span={8}>
                        <Statistic
                          title="Device Fetch Time"
                          value={time(device.fetchTime)}
                        />
                      </Col>
                      <Col span={8}>
                        <Statistic
                          valueStyle={{
                            color: device.connected ? '#3f8600' : '#cf1322',
                          }}
                          title="Device Status"
                          value={device.connected ? 'Active' : 'Inactive'}
                        />
                      </Col>
                    </Row>
                    <Divider> Last Accounted Data </Divider>

                    {devicesData[id].length ? (
                      <Row
                        gutter={16}
                        style={{ textAlign: 'center', margin: '20px 0' }}
                      >
                        {Object.keys(devicesData[id][0]).map((reading) => (
                          <Col span={6}>
                            <Statistic
                              suffix={addSuffix(reading)}
                              prefix={addPrefix(reading)}
                              title={camelToNormal(reading)}
                              value={devicesData[id][0][reading]}
                            />
                          </Col>
                        ))}
                      </Row>
                    ) : (
                      <Empty />
                    )}
                  </TabPane>
                ))}
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Wrapper>
    </div>
  )
}

export default WithAuth(Home)
