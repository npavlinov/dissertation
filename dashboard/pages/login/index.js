import React from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import 'antd/dist/antd.css'
import './login.css'
import Wrapper from '../../components/Wrapper'
import { Form, Icon, Input, Button, Checkbox, Row } from 'antd'
import { login } from '../../utils/auth'

const { publicRuntimeConfig } = getConfig()

function Login(props) {
  const handleSubmit = async e => {
    e.preventDefault()

    const username = props.form.getFieldValue('username')
    const password = props.form.getFieldValue('password')
    console.log(JSON.stringify({ username, password }))

    props.form.validateFields((err, values) => {
      if (err) {
        console.log(err)
      }
    })

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
        console.log('Login failed!')
        let error = new Error(res.message)
        error.response = response
        throw error
      }
    } catch (err) {
      console.log(err)
    }
  }

  const { getFieldDecorator } = props.form

  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ padding: 24, minHeight: '100%' }}
        >
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Please input your username!' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
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
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </Row>
      </Wrapper>
    </div>
  )
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login)

export default WrappedNormalLoginForm
