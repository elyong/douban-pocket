import React, { Component } from 'react'

import './index.css'

class Publisher extends Component {
  render () {
    const publisher = this.props.item
    return (
      <span className='publisher-container'>{publisher} </span>
    )
  }
}

export default Publisher
