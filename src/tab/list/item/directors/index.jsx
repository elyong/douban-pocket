import React, { Component } from 'react'

import './index.css'

class Directors extends Component {
  render () {
    const directors = this.props.item
    return (
      <span className='directors-container'>{directors.name} </span>
    )
  }
}

export default Directors
