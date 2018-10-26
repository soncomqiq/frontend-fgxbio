import React, { Component } from 'react'
import { Button, Icon, message } from 'antd'
import axios from 'axios'
import TextSearch from './TextSearch'
import { BASE_URL } from '../constants'

export default class PageSearch extends Component {
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
      <div className="container" align="center">
        <section className="section">
          <div background-color="lightblue">
            <p>
              <strong>
                We provide multiple ways to access our search function for you
                to compare your data with the database
              </strong>
            </p>
            <br />
            <div>
              <p>Compare by excel data file</p>
              <br />
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
            <br />
            <br />
            <div />
            <TextSearch />
            <br />
            <div>
              <h1>
                Or manually input the Locus and Allele base on your test kit
              </h1>
            </div>
            <br />

            <Button type="primary" size="large" style={{ width: '50%' }}>
              <a href="/search/manual/">Manual Search</a>
            </Button>
          </div>
          <br />
          <br />
          <div>
            <p>
              In case that you have the data file for comaparation, please
              adjust the format of the file into a specific one.
            </p>
            <p>The format of the excel file can be found here</p>
            <br />

            <a
              className="button is-success"
              style={{ width: '50%' }}
              onClick={this.downloadSample}
            >
              <Icon type="download" /> Sample Excel File
            </a>
          </div>
        </section>
      </div>
    )
  }
}
