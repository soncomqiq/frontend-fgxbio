import React, { Component } from 'react'
import { Icon, message } from 'antd'
import axios from 'axios'
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

  handleExcelAdd = event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('name', 'excelAdd')
    data.append('description', 'Add data by excel')
    var token = localStorage.getItem('user')
    var sample_name = event.target.files[0].name
    this.setState({ fileUploadName: event.target.files[0].name })
    axios
      .post(`${BASE_URL}/api/admin/exceladd`, data, {
        headers: {
          token: token.substring(1, token.length - 1)
        }
      })
      .then(response => {
        if (response.data == 'success') {
          message.success(`Add Data Sample ${sample_name} Complete`)
          // do something with the response
        } else message.error('File Upload Fail')
      })
  }

  render() {
    return (
      <div align="center">
        <section className="section">
          <div background-color="lightblue">
            <p>
              <strong>
                Administrator can add data for more haplotype in the database by
                excel file with specific format
              </strong>
            </p>
            <br />
            <div>
              <div className="file has-name is-boxed is-centered">
                <label className="file-label">
                  <input
                    className="file-input"
                    type="file"
                    name="serachexcel"
                    onChange={this.handleExcelAdd}
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
          </div>
          <br />
          <br />
          <div>
            <p>
              In case that you have the data file for addition, please adjust
              the format of the file into a specific one.
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
