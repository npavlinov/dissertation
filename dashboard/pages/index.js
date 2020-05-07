import React, { useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import {
  Card,
  Col,
  Row,
  Typography,
  Space,
  Tabs,
  Statistic,
  Divider,
  Empty,
} from 'antd'
import 'antd/dist/antd.css'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
import Link from 'next/link'
import Wrapper from '../components/Wrapper'
import WithAuth from '../components/WithAuth'
import Loading from '../components/Loading'

import getConfig from 'next/config'
import time from '../utils/time'
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

const { publicRuntimeConfig } = getConfig()

const Home = (props) => {
  const [donutChart, setDonutChart] = useState({
    series: [0],
    options: {
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70%',
          },
        },
      },
      labels: ['Active Devices'],
    },
  })

  // We need both of these calls, since some of the devices may not have data
  const { data: devices } = useSWR(
    [`${publicRuntimeConfig.API_URL}/api/devices`, 'GET', props.token],
    fetcher
  )

  const { data: devicesData } = useSWR(
    [`${publicRuntimeConfig.API_URL}/api/data?limit=1`, 'GET', props.token],
    fetcher
  )

  if (!devices || !devicesData) {
    return <Loading />
  }

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ marginTop: '50px' }}
        >
          <Col span={8} style={{ textAlign: 'center' }} className="gutter-row">
            <Title>Hello, {props.firstName}</Title>
            <Title level={3} style={{ fontWeight: '300' }}>
              This is your dashboard
            </Title>
          </Col>
          <Col span={8} className="gutter-row">
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
              <Space>
                <UsbFilled style={{ fontSize: '64px', color: '#011529' }} />
                <Title level={2} style={{ margin: '0 10px' }}>
                  {devices.length} Devices
                </Title>
                <Title
                  level={3}
                  style={{
                    color: '#1890fe',
                    fontWeight: '400',
                    margin: '10px 0',
                  }}
                >
                  ({devices.filter((device) => device.connected).length} active)
                </Title>
              </Space>
            </Card>
          </Col>
          <Col span={8} className="gutter-row">
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
              <Space>
                <ControlFilled style={{ fontSize: '64px', color: '#011529' }} />
                <Title level={2} style={{ margin: '0 10px' }}>
                  Management
                </Title>
              </Space>
            </Card>
          </Col>
        </Row>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ marginTop: '50px' }}
        >
          <Col span={8} className="gutter-row">
            <Card>
              <Chart
                options={donutChart.options}
                series={[devices.filter((device) => device.connected).length]}
                type="radialBar"
                height={350}
              />
            </Card>
          </Col>

          <Col span={16} className="gutter-row">
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
                        <Col span={6}>
                          <Statistic
                            title="pH Levels"
                            value={devicesData[id][0].pH}
                          />
                        </Col>
                        <Col span={6}>
                          <Statistic
                            title="Water Levels"
                            value={devicesData[id][0].waterLevels}
                          />
                        </Col>
                        <Col span={6}>
                          <Statistic
                            title="Water Temperature"
                            value={devicesData[id][0].waterTemperature}
                          />
                        </Col>
                        <Col span={6}>
                          <Statistic
                            title="Air Temperature"
                            value={devicesData[id][0].airTemperature}
                          />
                        </Col>
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
