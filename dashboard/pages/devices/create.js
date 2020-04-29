import React, { useState } from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import { Button, Typography } from 'antd'
import 'antd/dist/antd.css'
import DeviceForm from '../../components/DeviceForm'
import Wrapper from '../../components/Wrapper'
import WithAuth from '../../components/WithAuth'
const { publicRuntimeConfig } = getConfig()

const { Title } = Typography

const AddDevice = (props) => {
  return (
    <div>
      <Head>
        <title>Add Device</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Title level={2}>Add Device</Title>
          <DeviceForm config={publicRuntimeConfig} token={props.token} />
        </div>
      </Wrapper>
    </div>
  )
}

export default WithAuth(AddDevice)
