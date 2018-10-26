import React, { Component } from 'react'
import { Modal, Form, Icon, Input, Button } from 'antd'
import axios from 'axios'
import { BASE_URL } from '../constants'
const FormItem = Form.Item

class NormalLoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        axios.post(`${BASE_URL}/api/auth`, values).then(response => {
          if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data.token))
            window.location = window.location.href
          }
        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            style={{ width: '100%' }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm)

class LoginModal extends React.Component {
  render() {
    return (
      <Modal
        title="Admin Login"
        visible={this.props.modalState}
        onOk={this.hideModal}
        footer={null}
        onCancel={this.props.onCloseLoginModal}
        onCLose={this.props.onCloseLoginModal}
      >
        <WrappedNormalLoginForm login={this.props.login} />
      </Modal>
    )
  }
}

export default LoginModal
