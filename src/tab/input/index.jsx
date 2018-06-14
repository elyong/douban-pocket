import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp'

import './index.css'
import searchPng from './img/search.png'

class Input extends Component {
  handleMouseUp (event) {
    const isSelected = this.props.isSelected
    const search = this.input.value
    if (isSelected === 0 && search) {
      fetchJsonp('https://api.douban.com/v2/book/search?q=' + search)
        .then(response => response.json())
        .then(json => {
          console.log('parsed book')
          this.props.onSearch(json, 0, search, true)
        })
        .catch(e => console.log('parsed book failed', e))
    } else if (isSelected === 1 && search) {
      fetchJsonp('https://api.douban.com/v2/movie/search?q=' + search)
        .then(response => response.json())
        .then(json => {
          console.log('parsed movie')
          this.props.onSearch(json, 1, search, true)
        })
        .catch(e => console.log('parsed movie failed', e))
    } else if (isSelected === 2 && search) {
      fetchJsonp('https://api.douban.com/v2/music/search?q=' + search)
        .then(response => response.json())
        .then(json => {
          console.log('parsed music')
          this.props.onSearch(json, 2, search, true)
        })
        .catch(e => console.log('parsed music failed', e))
    }
  }
  componentDidMount () {
    this.input.focus()
  }
  render () {
    return (
      <div className='search-container'>
        <img className='searchPng' src={searchPng} />
        <input type='search' ref={input => this.input = input} />
        <div className='search-button' onMouseUp={this.handleMouseUp.bind(this)}>搜索</div>
      </div>
    )
  }
}

export default Input
