import React from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import { Typography } from 'antd'
import notification from '../../utils/notification'
import DeviceForm from '../../components/DeviceForm'
import Wrapper from '../../components/Wrapper'
import WithAuth from '../../components/WithAuth'

const { publicRuntimeConfig } = getConfig()
const { Title } = Typography

const AddDevice = (props) => {
  const handleSubmit = async (values) => {
    try {
      const res = await fetch(`${publicRuntimeConfig.API_URL}/api/devices/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: props.token,
        },
        body: JSON.stringify(values),
      })
      const { message } = await res.json()
      if (res.status === 200) {
        notification('success', message)
      } else {
        notification('error', message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Head>
        <title>Add Device</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Title level={2}>Add Device</Title>
          <DeviceForm handleSubmit={handleSubmit} />
        </div>
      </Wrapper>
    </div>
  )
}

export default WithAuth(AddDevice)
