import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import axios from 'axios'
import { BASE_URL } from '../constants'
import TextSampleImage from '../images/TextSample.png'

const { TextArea } = Input
const FormItem = Form.Item

class TextSearch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      LocusKit: [],
      Result: [],
      ResultAmount: '0',
      ResultFullAmount: '0',
      Minimal: [],
      MinimalAmount: '0',
      MinimalFullAmount: '0'
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var data = []
        var result = values.textinput.replace(/(\r\n|\n|\r)/gm, ' ')
        var x = result.split(' ')
        var y = x.map(row => row.split(':'))
        var z = y.map(locus => locus[1].split(','))
        for (var i = 0; i < y.length; i++) {
          for (var j = 0; j < z[i].length; j++)
            data.push({
              locus: `${y[i][0]}`,
              allele: `${z[i][j]}`
            })
        }
        console.log(data)
        const user = localStorage.getItem('user')
        axios.post(`${BASE_URL}/api/search/manual`, data).then(response => {
          //console.log(response.data)
          if (user) {
            this.setState({
              Result: response.data.result,
              ResultAmount: response.data.result.length,
              ResultFullAmount: response.data.result_total,
              Minimal: response.data.expect,
              MinimalAmount: response.data.expect.length,
              MinimalFullAmount: response.data.expect_total
            })
          } else
            this.setState({
              ResultAmount: response.data.result.length,
              ResultFullAmount: response.data.result_total,
              MinimalAmount: response.data.expect.length,
              MinimalFullAmount: response.data.expect_total
            })
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const user = localStorage.getItem('user')
    return (
      <div className="container">
        <div className="columns">
          <div className="column">
            <p>
              <strong>Please input the Locus and Allele</strong>
            </p>
            <br />
            <div style={{ width: '100%' }}>
              <Form onSubmit={this.handleSubmit}>
                <FormItem>
                  {getFieldDecorator('textinput', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your text search!'
                      }
                    ]
                  })(<TextArea placeholder="CSF1PO:5,6" autosize />)}
                </FormItem>
                <FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Text Search
                  </Button>
                </FormItem>
              </Form>
            </div>
          </div>
          <div className="column">
            <p>
              <strong>The pattern example can be found here</strong>
            </p>
            <br />
            <p>
              [Locus]:[Allele],[Allele]<br />[Locus]:[Allele]
            </p>
            <br />
            <p>Just like the following example</p>
            <div>
              <img src={TextSampleImage} />
            </div>
          </div>
        </div>

        <div>
          <p>
            There are {this.state.ResultAmount} matching samples from{' '}
            {this.state.ResultFullAmount[0].Total} samples in the database
          </p>
          <br />
          {user &&
            this.state.Result.map(sample => (
              <div>
                Sample Year :{sample.Sample_Year} Sample ID : {sample.Sample_ID}
              </div>
            ))}
          <br />
          <p>
            Expect to match {this.state.MinimalAmount} samples from{' '}
            {this.state.MinimalFullAmount[0].Total} samples in Minimal Kit
          </p>
          <br />
          {user &&
            this.state.Minimal.map(sample => (
              <div>
                Sample Year:{sample.Sample_Year} Sample ID : {sample.Sample_ID}
              </div>
            ))}
        </div>
      </div>
    )
  }
}

const WrappedTextSearch = Form.create()(TextSearch)

export default WrappedTextSearch
