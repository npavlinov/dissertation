import React from 'react'
import { Skeleton } from 'antd'
import Head from 'next/head'
import Wrapper from './Wrapper'

function Loading() {
  return (
    <div>
      <Head>
        <title>Edit Device</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Skeleton active />
        </div>
      </Wrapper>
    </div>
  )
}

export default Loading
