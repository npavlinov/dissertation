import React, { useState } from 'react'
import Head from 'next/head'
import 'antd/dist/antd.css'
import './login.css'
import Wrapper from '../../components/Wrapper'
import { Form, Icon, Input, Button, Checkbox, Row } from 'antd'

function Login(props) {
  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
    alert(JSON.stringify(props.form.getFieldsValue()))
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
