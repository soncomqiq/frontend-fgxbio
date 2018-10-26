import React, { Component } from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'

export default class LocusStatisticInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      locus: this.props.locus,
      alleleCount: this.props.alleleCount,
      heteroSummary: this.props.heteroSummary
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      locus: nextProps.locus,
      alleleCount: nextProps.alleleCount,
      heteroSummary: nextProps.heteroSummary
    }
  }

  render() {
    var observed_allele = this.state.alleleCount.map(sample => sample.Allele)
    var allele_amount = this.state.alleleCount.map(sample => sample.amount)
    var chartData = {
      labels: observed_allele,
      datasets: [
        {
          label: 'Allele Frequency',
          data: allele_amount,
          backgroundColor: '#f5222d'
        }
      ]
    }
    //console.log(observed_allele, allele_amount)
    return (
      <div>
        <p>
          <strong>Locus : </strong>
          {this.state.locus}
        </p>
        <br />
        <p>
          <strong>Observed Allele : </strong>
          {observed_allele.map(sample => (
            <span>
              {' '}
              {sample} <span />
            </span>
          ))}
        </p>
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: true
          }}
        />
        <br />
        <br />
        <div>
          <p>
            <strong>Summary</strong>
          </p>
          {this.state.heteroSummary.map(sample => {
            if (sample.Locus == this.state.locus)
              return (
                <div key={sample.Locus}>
                  <br />
                  <p>
                    <strong>Locus : </strong>
                    {sample.Locus} <strong>Total Haplotype : </strong>
                    {sample.Total} <strong>Hetero Haplotype : </strong>
                    {sample.Hetero} <strong>Homo Haplotype : </strong>
                    {sample.Total - sample.Hetero}
                  </p>
                  <br />
                  <p>
                    <strong>heterozygocity = </strong>
                    {(
                      parseFloat(sample.Hetero) / parseFloat(sample.Total)
                    ).toFixed(2)}{' '}
                    <strong>homozygocity : </strong>
                    {(
                      1 -
                      parseFloat(sample.Hetero) / parseFloat(sample.Total)
                    ).toFixed(2)}
                  </p>
                  <br />
                  <br />
                  <Doughnut
                    data={{
                      labels: ['Heterozygocity', 'Homozygocity'],
                      datasets: [
                        {
                          label: 'Amount',
                          data: [
                            parseFloat(sample.Hetero) /
                              parseFloat(sample.Total),
                            1 -
                              parseFloat(sample.Hetero) /
                                parseFloat(sample.Total)
                          ],
                          backgroundColor: ['#fa541c', '#a0d911']
                        }
                      ]
                    }}
                  />
                </div>
              )
          })}
        </div>
      </div>
    )
  }
}
