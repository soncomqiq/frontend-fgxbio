import React, { Component } from 'react'

import { Button, Icon, message } from 'antd'
import axios from 'axios'
import { BASE_URL } from '../constants'

export default class ExcelSearch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fileUploadName: 'None'
    }
  }

  downloadSample() {
    setTimeout(() => {
      const response = {
        file: `${BASE_URL}/api/search/sampleexcel`
      }
      window.location.href = response.file
    }, 100)
  }

  handleExcelSearch = event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('name', 'excelSearch')
    data.append('description', 'search by excel')
    this.setState({ fileUploadName: event.target.files[0].name })
    axios.post(`${BASE_URL}/api/search/excelsearch`, data).then(response => {
      if (response.data) {
        message.success('File Upload Complete')
        console.log(response) // do something with the response
      } else message.error('File Upload Fail')
    })
  }

  render() {
    return (
      <div className="container">
        <div className="columns">
          <div className="column is-3">
            <div className="file has-name is-boxed is-centered">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  name="serachexcel"
                  onChange={this.handleExcelSearch}
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload" />
                  </span>
                  <span className="file-label">Choose a file…</span>
                </span>
                <span className="file-name">{this.state.fileUploadName}</span>
              </label>
            </div>
          </div>
          <div className="column">
            {' '}
            <div className="container">
              <p>
                <strong>
                  In order to use excel search function, we expect a specific
                  format from your excel file
                </strong>
              </p>
              <p>The sample excel can be download here</p>
              <a
                className="button is-success"
                style={{ height: '80px', width: '80%' }}
                onClick={this.downloadSample}
              >
                <Icon type="download" /> Sample Excel File
              </a>
            </div>
          </div>
        </div>
        <div>Result</div>
      </div>
    )
  }
}
