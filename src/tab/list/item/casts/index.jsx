import React, { Component } from 'react'

import './index.css'

class Casts extends Component {
  render () {
    const casts = this.props.casts
    const index = this.props.index
    if (index === 0) {
      return (
        <span className='casts-container'>{casts.name} </span>
      )
    } else if (index === 1 && casts.avatars) {
      return (
        <img className='castPicture' src={casts.avatars.small} />
      )
    } else {
      return (
        <div />
      )
    }
  }
}

export default Casts
