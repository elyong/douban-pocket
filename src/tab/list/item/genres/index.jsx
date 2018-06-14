import React, { Component } from 'react'

import './index.css'

class Genres extends Component {
  render () {
    const genres = this.props.genres
    return (
      <span className='genres-container'>{genres} </span>
    )
  }
}

export default Genres
