import React from 'react'

const AlphaColor = {
  A: '#5BF13E',
  T: '#388BEE',
  C: '#FFB23E',
  G: '#ED493B'
}

export default props => (
  <div>
    <div className="columns">
      <div className="column is-1">{props.data.Sample_Year}</div>
      <div className="column is-1">{props.data.Sample_ID}</div>
      <div className="column">
        {' '}
        {props.data.Sequence.split('').map(letter => (
          <span style={{ backgroundColor: AlphaColor[letter] }}>{letter}</span>
        ))}{' '}
      </div>
      <div className="column is-1">{props.data.Read_Count}</div>
      <div className="column is-2">{props.data.pattern}</div>
    </div>
  </div>
)
