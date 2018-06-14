import React, { Component } from 'react'

import './index.css'

class Tags extends Component {
  render () {
    const tags = this.props.item
    return (
      <span className='tags-container'>{tags.name} </span>
    )
  }
}

export default Tags
