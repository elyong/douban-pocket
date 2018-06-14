import React, { Component } from 'react'

import './index.css'

class Author extends Component {
  render () {
    const booksAuthor = this.props.booksAuthor
    const musicAuthor = this.props.musicAuthor
    if (booksAuthor) {
      return (
        <span className='author-container'>{booksAuthor} </span>
      )
    } else if (musicAuthor) {
      return (
        <span className='author-container'>{musicAuthor.name} </span>
      )
    }
  }
}

export default Author
