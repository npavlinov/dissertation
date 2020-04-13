import React from 'react'
import Head from 'next/head'
import getConfig from 'next/config'
import { Layout, Breadcrumb } from 'antd'
import 'antd/dist/antd.css'
import Wrapper from '../components/Wrapper'
import nextCookie from 'next-cookies'
import fetch from 'isomorphic-unfetch'
import redirect from '../utils/redirect'
import WithAuth from '../components/WithAuth'

const { publicRuntimeConfig } = getConfig()
const { Header, Content, Footer } = Layout

const Profile = props => {
  // const { username } = props
  return (
    <div>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>{props.username}</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}></div>
      </Wrapper>
    </div>
  )
}

Profile.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx)
  try {
    const res = await fetch(`${publicRuntimeConfig.API_URL}/profile`, {
      credentials: 'include',
      headers: { Authorization: token },
    })
    if (res.status === 200) {
      return await res.json()
    } else {
      return redirect(ctx, '/login')
    }
  } catch (err) {
    return redirect(ctx, '/login')
  }
}

export default WithAuth(Profile)
