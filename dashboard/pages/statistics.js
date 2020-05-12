import { useState } from 'react'
import WithAuth from '../components/WithAuth'
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import Wrapper from '../components/Wrapper'
import Loading from '../components/Loading'
import getConfig from 'next/config'
import { Tabs, Card, Empty, Row, Col, Statistic } from 'antd'
import useSWR from 'swr'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

import fetcher from '../utils/fetcher'
import time from '../utils/time'

const { publicRuntimeConfig } = getConfig()

const { TabPane } = Tabs

const fetcherDevices = async (url, type, token) => {
  const res = await fetch(url, {
    method: type,
    credentials: 'include',
    headers: { Authorization: token },
  }).then((_) => _.json())

  let data = []

  res.forEach((deviceData) => {
    let currObj = {}
    deviceData.forEach((dataObj) => {
      Object.keys(dataObj).forEach((key) => {
        currObj[key] = (currObj[key] || []).concat([dataObj[key]])
      })
    })
    data.push(currObj)
  })

  return data
}

const Statistics = (props) => {
  const [chartOptions, setChartOptions] = useState({
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Device Data ( last 15 entries )',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
    },
  })

  const { data: devices } = useSWR(
    [`${publicRuntimeConfig.API_URL}/api/devices`, 'GET', props.token],
    fetcher
  )

  const { data: devicesData } = useSWR(
    [`${publicRuntimeConfig.API_URL}/api/data?order=asc`, 'GET', props.token],
    fetcherDevices,
    { refreshInterval: 30000 }
  )

  if (!devices || !devicesData) {
    return <Loading />
  }

  const deviceSeries = devicesData.map((deviceData) => {
    return {
      series: [
        {
          name: 'Air Temperature',
          data: deviceData.airTemperature,
        },
        {
          name: 'Water Temperature',
          data: deviceData.waterTemperature,
        },
        {
          name: 'pH Levels',
          data: deviceData.pH,
        },
        {
          name: 'Water Levels',
          data: deviceData.waterLevels,
        },
      ],
    }
  })

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Card>
          <Tabs size="large">
            {devices.map((device, i) => (
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
                {Object.keys(devicesData[i]).length ? (
                  <Chart
                    data-cy={`chart-${i}`}
                    options={chartOptions.options}
                    series={deviceSeries[i].series}
                    type="line"
                    height={350}
                  />
                ) : (
                  <Empty />
                )}
              </TabPane>
            ))}
          </Tabs>
        </Card>
      </Wrapper>
    </div>
  )
}

export default WithAuth(Statistics)
