import React, { Component } from 'react'
import axios from 'axios'
import { Row, Radio } from 'antd'
import LocusStatisticInfo from '../components/LocusStatisticInfo'
import { BASE_URL } from '../constants'

const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const radioStyle = {
  display: 'block',
  height: '15px',
  lineHeight: '15px'
}

export default class PageStatisticLocus extends Component {
  constructor(props) {
    super(props)

    this.state = {
      LocusList: [],
      LocusList_A: [],
      LocusList_Y: [],
      LocusList_X: [],
      SelectedLocus: '',
      AlleleCount: [],
      dataSummary: [],
      currentSTR: 'AutosomalSTR'
    }

    this.renderLocusList = this.renderLocusList.bind(this)
  }

  componentDidMount() {
    axios.get(`${BASE_URL}/api/resource/locuslist`).then(
      function(response) {
        //console.log(response.data)
        var A_list = []
        var Y_list = []
        var X_list = []
        response.data.map(sample => {
          if (sample.DataType == 'A') A_list.push({ Locus: sample.Locus })
          else if (sample.DataType == 'Y') Y_list.push({ Locus: sample.Locus })
          else if (sample.DataType == 'X') X_list.push({ Locus: sample.Locus })
        })

        this.setState({
          LocusList: response.data,
          LocusList_A: A_list,
          LocusList_Y: Y_list,
          LocusList_X: X_list
        })
      }.bind(this)
    )

    axios.get(`${BASE_URL}/api/resource/hetero`).then(
      function(response) {
        //console.log(response.data)
        this.setState({ dataSummary: response.data })
      }.bind(this)
    )
  }

  onChange = e => {
    console.log('radio checked', e.target.value)
    axios.get(`${BASE_URL}/api/resource/locusinfo/${e.target.value}`).then(
      function(response) {
        //console.log(response.data)
        this.setState({ AlleleCount: response.data })
      }.bind(this)
    )
    this.setState({
      SelectedLocus: e.target.value
    })
  }

  renderLocusList() {
    switch (this.state.currentSTR) {
      case 'Autosomal_STR':
        return (
          <RadioGroup onChange={this.onChange} value={this.state.SelectedLocus}>
            {this.state.LocusList_A.map(locus => (
              <div className="column is-2">
                <Radio style={radioStyle} value={locus.Locus} key={locus.locus}>
                  <strong>{locus.Locus}</strong>
                </Radio>
              </div>
            ))}
          </RadioGroup>
        )

      case 'Y_STR':
        return (
          <RadioGroup onChange={this.onChange} value={this.state.SelectedLocus}>
            {this.state.LocusList_Y.map(locus => (
              <div className="column is-2">
                <Radio style={radioStyle} value={locus.Locus} key={locus.locus}>
                  <strong>{locus.Locus}</strong>
                </Radio>
              </div>
            ))}
          </RadioGroup>
        )

      case 'X_STR':
        return (
          <RadioGroup onChange={this.onChange} value={this.state.SelectedLocus}>
            {this.state.LocusList_X.map(locus => (
              <div className="column is-2">
                <Radio style={radioStyle} value={locus.Locus} key={locus.locus}>
                  <strong>{locus.Locus}</strong>
                </Radio>
              </div>
            ))}
          </RadioGroup>
        )

      default:
        return (
          <RadioGroup onChange={this.onChange} value={this.state.SelectedLocus}>
            {this.state.LocusList_A.map(locus => (
              <div className="column is-2">
                <Radio style={radioStyle} value={locus.Locus} key={locus.locus}>
                  <strong>{locus.Locus}</strong>
                </Radio>
              </div>
            ))}
          </RadioGroup>
        )
    }
  }

  render() {
    return (
      <div className="container">
        <br />
        <h1 className="title is-2">
          <strong>
            Full statistic of the haplotype in the database by locus
          </strong>
        </h1>
        <div className="columns">
          <div className="column is-3">
            <RadioGroup
              onChange={e => this.setState({ currentSTR: `${e.target.value}` })}
              defaultValue="Autosomal_STR"
            >
              <RadioButton value="Autosomal_STR">Autosomal STR</RadioButton>
              <RadioButton value="Y_STR">Y STR</RadioButton>
              <RadioButton value="X_STR">X STR</RadioButton>
            </RadioGroup>
            <br />
            <br />
            {this.renderLocusList()}
            <br />
          </div>
          <div className="column">
            <LocusStatisticInfo
              locus={this.state.SelectedLocus}
              alleleCount={this.state.AlleleCount}
              heteroSummary={this.state.dataSummary}
            />
          </div>
        </div>
      </div>
    )
  }
}
