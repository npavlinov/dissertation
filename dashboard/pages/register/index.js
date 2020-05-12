import React from 'react'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import Wrapper from '../../components/Wrapper'
import { Form, Input, Button, Card, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { login } from '../../utils/auth'
import notification from '../../utils/notification'

const { publicRuntimeConfig } = getConfig()
const { Title } = Typography

function Register(props) {
  const handleSubmit = async (values) => {
    try {
      const res = await fetch(
        `${publicRuntimeConfig.API_URL}/api/auth/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
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

  return (
    <div>
      <Wrapper noNav title="Register">
        <div className="site-card-border-less-wrapper">
          <Title style={{ textAlign: 'center' }} level={1}>
            Register
          </Title>
          <Card style={{ margin: '30px auto' }}>
            <Form onFinish={handleSubmit} className="register-form">
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
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid e-mail!' },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your first name!',
                  },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your last name!',
                  },
                ]}
              >
                <Input placeholder="Last Name" />
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

export default Register
