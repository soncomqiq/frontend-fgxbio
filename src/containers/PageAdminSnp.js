import React, { Component } from 'react'
import axios from 'axios'
import { BASE_URL } from '../constants'
import { HorizontalBar } from 'react-chartjs-2'

var arr = [1, 2, 3]

export default class PageAdminSnp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      locusList: [],
      snpSummary: []
    }
  }

  componentDidMount() {
    axios.get(`${BASE_URL}/api/admin/adminsnp`).then(
      function(response) {
        //console.log(response.data)
        var Locus = ''
        var A_Amount = 0
        var T_Amount = 0
        var C_Amount = 0
        var G_Amount = 0
        var I_Amount = 0
        var Total_Amount = 0
        var result = []
        response.data.map(row => {
          if (row.Locus == Locus) {
            switch (row.Genotype) {
              case 'A':
                A_Amount = row.Amount
                break
              case 'T':
                T_Amount = row.Amount
                break
              case 'C':
                C_Amount = row.Amount
                break
              case 'G':
                G_Amount = row.Amount
                break
              case 'I':
                I_Amount = row.Amount
                break
              default:
                break
            }
            Total_Amount += row.Amount
          } else {
            result.push({
              Locus: Locus,
              A: A_Amount,
              T: T_Amount,
              C: C_Amount,
              G: G_Amount,
              I: I_Amount,
              Total: Total_Amount
            })
            Locus = row.Locus
            A_Amount = 0
            T_Amount = 0
            C_Amount = 0
            G_Amount = 0
            Total_Amount = 0
            switch (row.Genotype) {
              case 'A':
                A_Amount = row.Amount
                break
              case 'T':
                T_Amount = row.Amount
                break
              case 'C':
                C_Amount = row.Amount
                break
              case 'G':
                G_Amount = row.Amount
                break
              case 'I':
                I_Amount = row.Amount
                break
              default:
                break
            }
            Total_Amount += row.Amount
          }
        })
        result.push({
          Locus: Locus,
          A: A_Amount,
          T: T_Amount,
          C: C_Amount,
          G: G_Amount,
          I: I_Amount,
          Total: Total_Amount
        })
        result.shift()
        this.setState({ snpSummary: result })
      }.bind(this)
    )
  }

  renderDisplay() {
    console.log(this.state.snpSummary)
    this.state.snpSummary.map(entry => {
      console.log(entry)
      return (
        <div>
          <div className="columns">
            <div className="column is-1">{entry.Locus}</div>
            <div className="column">Box</div>
            <div className="column is-1">{entry.Total}</div>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="container">
        <br />
        <h2 className="title is-2">
          <strong>iSNP Statistic Summary</strong>
        </h2>
        <br />
        <p>
          <strong>
            The statistic for iSNP data in the database are shown below, each
            color represent the genotype found in the samples.
          </strong>
        </p>
        <br />
        <div className="columns">
          <div
            align="center"
            className="column"
            style={{ backgroundColor: '#bae637' }}
          >
            <strong>A</strong>
          </div>
          <div
            align="center"
            className="column"
            style={{ backgroundColor: '#69c0ff' }}
          >
            <strong>T</strong>
          </div>
          <div
            align="center"
            className="column"
            style={{ backgroundColor: '#ffd666' }}
          >
            <strong>C</strong>
          </div>
          <div
            align="center"
            className="column"
            style={{ backgroundColor: '#ff7a45' }}
          >
            <strong>G</strong>
          </div>
          <div
            align="center"
            className="column"
            style={{ backgroundColor: '#ffadd2' }}
          >
            <strong>Un-Identified ( I )</strong>
          </div>
        </div>
        <br />
        <div>
          <div className="columns">
            <div className="column is-1" align="center">
              <strong>Locus</strong>
            </div>
            <div className="column" align="center">
              <strong>Percentage</strong>
            </div>
            <div className="column is-1">
              <strong>Total Amount</strong>
            </div>
          </div>
        </div>
        {this.state.snpSummary.map(entry => {
          var a = parseInt(entry.A / entry.Total * 100)
          var t = parseInt(entry.T / entry.Total * 100)
          var c = parseInt(entry.C / entry.Total * 100)
          var g = parseInt(entry.G / entry.Total * 100)
          var i = parseInt(entry.I / entry.Total * 100)
          return (
            <div>
              <div className="columns">
                <div className="column is-1">
                  <strong>{entry.Locus}</strong>
                </div>
                <div className="column">
                  <div className="columns">
                    <div
                      align="center"
                      style={{ backgroundColor: '#bae637', width: a + '%' }}
                    >
                      <strong>{a} %</strong>
                    </div>
                    <div
                      align="center"
                      style={{ backgroundColor: '#69c0ff', width: t + '%' }}
                    >
                      <strong>{t} %</strong>
                    </div>
                    <div
                      align="center"
                      style={{ backgroundColor: '#ffd666', width: c + '%' }}
                    >
                      <strong>{c} %</strong>
                    </div>
                    <div
                      align="center"
                      style={{ backgroundColor: '#ff7a45', width: g + '%' }}
                    >
                      <strong>{g} %</strong>
                    </div>
                    <div
                      align="center"
                      style={{ backgroundColor: '#ffadd2', width: i + '%' }}
                    >
                      <strong>{i} %</strong>
                    </div>
                  </div>
                </div>
                <div className="column is-1">
                  <strong>{entry.Total}</strong>
                </div>
              </div>
              <br />
            </div>
          )
        })}
      </div>
    )
  }
}

/*
var Locus = this.state.snpSummary.map(sample => sample.Locus)
    var allele_amount = this.state.snpSummary.map(sample => sample.A)
    var chartData = {
      labels: Locus,
      datasets: [
        {
          label: 'iSNP Frequency',
          data: allele_amount,
          borderWidth: 1,
          backgroundColor: 'blue'
        }
      ]
    }


<HorizontalBar
          data={chartData}
          options={{
            maintainAspectRatio: true
          }}
        />
  */
