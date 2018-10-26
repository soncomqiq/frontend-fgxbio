import React, { Component } from 'react'
import { Input, Select, Button } from 'antd'
import { BASE_URL } from '../constants'
import axios from 'axios'
import AlignmentEntry from '../components/AlignmentEntry'

const InputGroup = Input.Group
const Option = Select.Option

export default class PageAdminSequence extends Component {
  constructor(props) {
    super(props)

    this.state = {
      locuslist: [],
      selectedLocus: '',
      alleleInfo: [],
      selectedAllele: '',
      result: []
    }
  }

  componentDidMount() {
    axios.get(`${BASE_URL}/api/resource/locuslist`).then(
      function(response) {
        console.log(response.data)
        this.setState({ locuslist: response.data })
      }.bind(this)
    )

    axios.get(`${BASE_URL}/api/resource/alleleinfo`).then(
      function(response) {
        console.log(response.data)
        this.setState({ alleleInfo: response.data })
      }.bind(this)
    )
  }

  sequenceAlign() {
    var token = localStorage.getItem('user')
    var data = {
      locus: this.state.selectedLocus,
      allele: this.state.selectedAllele,
      token: token.substring(1, token.length - 1)
    }
    axios.post(`${BASE_URL}/api/admin/seqalign`, data).then(
      function(response) {
        for (var i = 0; i < response.data.info.length; i++) {
          response.data.info[i]['pattern'] = response.data.pattern[i]
        }
        this.setState({
          result: response.data.info
        })
      }.bind(this)
    )
  }

  render() {
    return (
      <div className="container is-fluid">
        <br />

        <p>
          <strong>Please Pick Locus and Allele for Sequence alignment</strong>
        </p>
        <br />
        <div>
          <InputGroup compact>
            <Select
              style={{ width: 120 }}
              onChange={value => this.setState({ selectedLocus: value })}
              defaultValue="Select Locus"
            >
              {this.state.locuslist.map(sample => (
                <Option value={sample.Locus} key={sample.Locus}>
                  {sample.Locus}
                </Option>
              ))}
            </Select>
            <Select
              style={{ width: 120 }}
              onChange={value => this.setState({ selectedAllele: value })}
              defaultValue="Select Allele"
            >
              {this.state.alleleInfo.map(sample => {
                if (sample.locus == this.state.selectedLocus)
                  return (
                    <Option value={sample.allele} key={sample.allele}>
                      {sample.allele}
                    </Option>
                  )
                return null
              })}
            </Select>
            <Button type="primary" onClick={() => this.sequenceAlign()}>
              Go
            </Button>
          </InputGroup>
          <br />
          <p>
            <strong>Locus : </strong>
            {this.state.selectedLocus}
            <strong> Allele : </strong>
            {this.state.selectedAllele}
          </p>
          <br />
          <div>
            <div className="columns">
              <div className="column is-1">
                <strong>Sample_Year</strong>
              </div>
              <div className="column is-1">
                <strong>Sample_ID</strong>
              </div>
              <div className="column">
                <strong>Repeated Sequence</strong>
              </div>
              <div className="column is-1">
                <strong>Read Count</strong>
              </div>
              <div className="column is-2">
                <strong>Pattern</strong>
              </div>
            </div>
            <br />
            <div className="columns">
              <div className="column">
                {this.state.result.map(entry => (
                  <div
                    key={entry.Sample_Year + entry.Sample_ID + entry.Read_Count}
                  >
                    <AlignmentEntry data={entry} />
                  </div>
                ))}
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    )
  }
}
