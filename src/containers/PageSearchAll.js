import React, { Component } from 'react'
import { Radio } from 'antd'

import ManualSearch from './ManualSearch'
import TextSearch from './TextSearch'
import ExcelSearch from './ExcelSearch'

import TextSampleImage from '../images/TextSample.png'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

export default class PageSearchAll extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchType: 'Excel'
    }

    this.renderSearch = this.renderSearch.bind(this)
  }

  renderSearch() {
    switch (this.state.searchType) {
      case 'Excel':
        return (
          <div>
            <ExcelSearch />
          </div>
        )

      case 'Text':
        return (
          <div>
            <TextSearch />
          </div>
        )

      case 'Manual':
        return (
          <div>
            <ManualSearch />
          </div>
        )

      default:
        return <div>default</div>
    }
  }

  render() {
    return (
      <div>
        <br />
        <div className="container">
          <p>
            <strong>
              We provide multiple method to compare your sample data with our
              database
            </strong>
          </p>
          <br />
          <RadioGroup
            onChange={e => this.setState({ searchType: `${e.target.value}` })}
            defaultValue="Excel"
          >
            <RadioButton value="Excel">Excel</RadioButton>
            <RadioButton value="Text">Text</RadioButton>
            <RadioButton value="Manual">Manual</RadioButton>
          </RadioGroup>
        </div>
        <br />
        {this.renderSearch()}
      </div>
    )
  }
}
