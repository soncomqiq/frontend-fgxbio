import React, { Component } from 'react'
import ThaiMap from '../images/Thai_Map.svg'

export default class PageStatisticGeographic extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container">
        <br />
        <div>
          <strong>Statistic By Geographic</strong>
        </div>
        <br />
        <div className="columns">
          <div className="column is-6">
            <img src={ThaiMap} style={{ height: '1100px', width: '600px' }} />
          </div>
          <div className="column">
            <div>
              <strong>North</strong>
            </div>
            <br />
            <div>
              <strong>South</strong>
            </div>
            <br />
            <div>
              <strong>East</strong>
            </div>
            <br />
            <div>
              <strong>West</strong>
            </div>
            <br />
            <div>
              <strong>Central</strong>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
