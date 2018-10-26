import React, { Component } from 'react'
import { Layout, Row, Col, Radio } from 'antd'

import LocusSearch from './LocusSearch'
import {
  BASE_URL,
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
  Forenseq_X
} from '../constants/BioConstant'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

export default class ManualSearch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentSet: 'Autosomal',
      currentKit: 'Minimal_A'
    }

    this.renderKitList = this.renderKitList.bind(this)
  }

  renderKitList() {
    switch (this.state.currentSet) {
      case 'Autosomal':
        return Autosom_Kit_List.map(kit => (
          <RadioButton value={kit}>{kit}</RadioButton>
        ))

      case 'Y_STR':
        return Y_Kit_List.map(kit => (
          <RadioButton value={kit}>{kit}</RadioButton>
        ))

      case 'X_STR':
        return X_Kit_List.map(kit => (
          <RadioButton value={kit}>{kit}</RadioButton>
        ))

      default:
        return 'default'
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div>
            <div>
              <br />
              <p>
                <strong>Select your chromosome choice : </strong>
                {this.state.currentSet}
              </p>
              <br />
              <RadioGroup
                onChange={e =>
                  this.setState({ currentSet: `${e.target.value}` })
                }
                defaultValue="Autosomal"
              >
                <RadioButton value="Autosomal">Autosomal</RadioButton>
                <RadioButton value="Y_STR">Y_STR</RadioButton>
                <RadioButton value="X_STR">X_STR</RadioButton>
              </RadioGroup>
            </div>
            <br />
            <p>
              <strong>Pick a Kit : </strong>
              {this.state.currentKit}{' '}
            </p>
            <br />
            <RadioGroup
              onChange={e => this.setState({ currentKit: `${e.target.value}` })}
              defaultValue="Minimal"
            >
              <p>{this.renderKitList()}</p>
            </RadioGroup>
          </div>
          <div>
            <LocusSearch currentKit={this.state.currentKit} />
          </div>
        </div>
      </div>
    )
  }
}
