import React from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import Wrapper from '../../components/Wrapper'
import { Form, Input, Button, Checkbox, Row, Card } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { login } from '../../utils/auth'
import notification from '../../utils/notification'
import 'antd/dist/antd.css'
import './login.css'

const { publicRuntimeConfig } = getConfig()

function Login(props) {
  const handleSubmit = async (values) => {
    const username = values.username
    const password = values.password

    try {
      const res = await fetch(`${publicRuntimeConfig.API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (res.status === 200) {
        const { token } = await res.json()
        login(token)
      } else {
        const { message } = await res.json()
        notification('error', message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper noNav>
        <div className="site-card-border-less-wrapper">
          <Card style={{ margin: '30px auto' }}>
            <Form onFinish={handleSubmit} className="login-form">
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: 'Please enter your username!' },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please enter your password!' },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item style={{ margin: '0' }}>
                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                Or <a href="/register">register now!</a>
              </Form.Item>
            </Form>
          </Card>
        </div>
        <div style={{ textAlign: 'center', margin: '25px 0' }}>
          <img src="/login.svg" alt="Login photo" height="250" />
        </div>
      </Wrapper>
    </div>
  )
}

// const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login)

export default Login
