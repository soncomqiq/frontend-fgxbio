import React, { Component } from 'react'
import { Form, Row, Col, Input, Button } from 'antd'

import {
  //Autosomal PART
  Autosom_Kit_List,
  Minimal_A,
  InvestigatorIDplex,
  Powerplex16,
  Powerplex18D,
  AmpFLSTR_Identifiler_Plus,
  Verifiler_Express,
  Globalfiler,
  Forenseq_A,
  //Y PART
  Y_Kit_List,
  Minimal_Y,
  PowerplexY23,
  Yfiler,
  Yfiler_Plus,
  Forenseq_Y,
  //X PART
  X_Kit_List,
  Argus_X_12,
  Forenseq_X,
  BASE_URL
} from '../constants/BioConstant'
import axios from 'axios'

const FormItem = Form.Item

class LocusSearch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      LocusKit: Minimal_A,
      Result: [],
      ResultAmount: '0',
      ResultFullAmount: '0',
      Minimal: [],
      MinimalAmount: '0',
      MinimalFullAmount: '0'
    }
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps.currentKit)

    switch (nextProps.currentKit) {
      case 'Minimal_A':
        this.setState({ LocusKit: Minimal_A })
        break
      case 'InvestigatorIDplex':
        this.setState({ LocusKit: InvestigatorIDplex })
        break
      case 'Powerplex16':
        this.setState({ LocusKit: Powerplex16 })
        break
      case 'Powerplex18D':
        this.setState({ LocusKit: Powerplex18D })
        break
      case 'AmpFLSTR_Identifiler_Plus':
        this.setState({ LocusKit: AmpFLSTR_Identifiler_Plus })
        break
      case 'Verifiler_Express':
        this.setState({ LocusKit: Verifiler_Express })
        break
      case 'Globalfiler':
        this.setState({ LocusKit: Globalfiler })
        break
      case 'Forenseq_A':
        this.setState({ LocusKit: Forenseq_A })
        break
      case 'Minimal_Y':
        this.setState({ LocusKit: Minimal_Y })
        break
      case 'PowerplexY23':
        this.setState({ LocusKit: PowerplexY23 })
        break
      case 'Yfiler':
        this.setState({ LocusKit: Yfiler })
        break
      case 'Yfiler_Plus':
        this.setState({ LocusKit: Yfiler_Plus })
        break
      case 'Forenseq_Y':
        this.setState({ LocusKit: Forenseq_Y })
        break
      case 'Argus_X_12':
        this.setState({ LocusKit: Argus_X_12 })
        break
      case 'Forenseq_X':
        this.setState({ LocusKit: Forenseq_X })
        break
      default:
        this.setState({ LocusKit: ['CSF1PO'] })
    }
  }

  handleSearch = e => {
    e.preventDefault()
    var data = []
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        var locus = Object.keys(values)
        var text = Object.values(values)
        for (var i = 0; i < locus.length; i++) {
          var multi = text[i].split(',')
          multi.map(allele =>
            data.push({
              locus: `${locus[i]}`,
              allele: `${allele}`
            })
          )
        }
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

  handleReset = () => {
    this.props.form.resetFields()
  }

  // To generate mock Form.Item
  getFields() {
    //const count = this.state.LocusKit.length
    const { getFieldDecorator } = this.props.form
    const children = []
    for (let i = 0; i < this.state.LocusKit.length; i++) {
      children.push(
        <Col span={2} key={this.state.LocusKit[i]}>
          <FormItem label={`${this.state.LocusKit[i]}`}>
            {getFieldDecorator(`${this.state.LocusKit[i]}`, {
              rules: [{ required: true, message: 'Input allele' }]
            })(<Input placeholder={this.state.LocusKit[i]} />)}
          </FormItem>
        </Col>
      )
    }
    return children
  }

  render() {
    //console.log(this.state.Result)
    const user = localStorage.getItem('user')
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={24}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              Clear
            </Button>
          </Col>
        </Row>
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

        {/*<Row>
          <LocusSearchResult result={this.state.Result} />
        </Row>*/}
      </Form>
    )
  }
}

const WrappedLocusSearch = Form.create()(LocusSearch)

export default WrappedLocusSearch
