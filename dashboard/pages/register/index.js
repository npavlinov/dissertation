import React from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import Wrapper from '../../components/Wrapper'
import { Form, Icon, Input, Button, Checkbox, Row, Card } from 'antd'
import { login } from '../../utils/auth'
import notification from '../../utils/notification'
import 'antd/dist/antd.css'
// import './login.css'

const { publicRuntimeConfig } = getConfig()

function Login(props) {
  const handleSubmit = async (e) => {
    e.preventDefault()

    const registerObject = {
      username: props.form.getFieldValue('username'),
      firstName: props.form.getFieldValue('firstName'),
      lastName: props.form.getFieldValue('lastName'),
      email: props.form.getFieldValue('email'),
      password: props.form.getFieldValue('password'),
    }

    props.form.validateFields((err, values) => {
      if (err) {
        console.log(err)
      }
    })

    try {
      const res = await fetch(
        `${publicRuntimeConfig.API_URL}/api/auth/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registerObject),
        }
      )
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

  const { getFieldDecorator } = props.form

  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper noNav>
        <div className="site-card-border-less-wrapper">
          <Card style={{ margin: '30px auto' }}>
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
                {getFieldDecorator('email', {
                  rules: [
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid e-mail!' },
                  ],
                })(<Input placeholder="Email" />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('firstName', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your first name!',
                    },
                  ],
                })(<Input placeholder="First Name" />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('lastName', {
                  rules: [
                    { required: true, message: 'Please input your last name!' },
                  ],
                })(<Input placeholder="Last Name" />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: 'Please input your Password!' },
                  ],
                })(
                  <Input.Password
                    prefix={
                      <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="Password"
                  />
                )}
              </Form.Item>
              <Form.Item style={{ margin: '0' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
        <div style={{ textAlign: 'center', margin: '25px 0' }}>
          <img src="/register.svg" alt="Login photo" height="250" />
        </div>
      </Wrapper>
    </div>
  )
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login)

export default WrappedNormalLoginForm