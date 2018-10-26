import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import axios from 'axios'
import { BASE_URL } from '../constants'

const FormItem = Form.Item
const FullWord = {
  A: 'Autosomal STR',
  Y: 'Y STR',
  X: 'X STR'
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class PageAdminSample extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  }

  handleSubmit = e => {
    e.preventDefault()
    var token = localStorage.getItem('user')
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .get(
            `${BASE_URL}/api/admin/adminsample/${values.sampleYear}/${
              values.sampleID
            }`,
            {
              headers: {
                token: token.substring(1, token.length - 1)
              }
            }
          )
          .then(response => {
            //console.log(response.data)
            this.setState({ data: response.data })
          })
        console.log('Received values of form: ', values)
      }
    })
  }
  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form

    // Only show error after a field is touched.
    const sampleYearError =
      isFieldTouched('sampleYear') && getFieldError('sampleYear')
    const sampleIDError =
      isFieldTouched('sampleID') && getFieldError('sampleID')

    return (
      <div className="container is-fluid">
        <br />
        <p>
          <strong>Admin Function for access specific sample information</strong>
        </p>
        <br />
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem
            validateStatus={sampleYearError ? 'error' : ''}
            help={sampleYearError || ''}
          >
            {getFieldDecorator('sampleYear', {
              rules: [{ required: true, message: '!' }]
            })(
              <Input
                prefix={
                  <Icon type="calendar" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="sampleYear"
              />
            )}
          </FormItem>
          <FormItem
            validateStatus={sampleIDError ? 'error' : ''}
            help={sampleIDError || ''}
          >
            {getFieldDecorator('sampleID', {
              rules: [
                { required: true, message: 'Please input your sampleID!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="copy" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="text"
                placeholder="sampleID"
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Search
            </Button>
          </FormItem>
        </Form>
        <br />
        <div>
          <div className="columns">
            <div className="column is-1">
              <strong>DataType</strong>
            </div>
            <div className="column is-1">
              <strong>Locus</strong>
            </div>
            <div className="column is-1">
              <strong>Allele</strong>
            </div>
            <div className="column is-1">
              <strong>Read Count</strong>
            </div>
            <div className="column">
              <strong>Sequence</strong>
            </div>
          </div>
        </div>
        <br />
        <div>
          {this.state.data.map(entry => {
            return (
              <div className="columns">
                <div className="column is-1">{FullWord[entry.DataType]}</div>
                <div className="column is-1">{entry.Locus}</div>
                <div className="column is-1">{entry.Allele}</div>
                <div className="column is-1">{entry.Read_Count}</div>
                <div className="column">{entry.Sequence}</div>
              </div>
            )
          })}
        </div>
        <br />
      </div>
    )
  }
}

const WrappedPageAdminSample = Form.create()(PageAdminSample)

export default WrappedPageAdminSample
