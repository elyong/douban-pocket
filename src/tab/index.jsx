import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp'

import './index.css'

import List from './list'
import Input from './input'

import Book from './img/book.png'
import Movie from './img/Movie.png'
import Music from './img/Music.png'

class Tab extends Component {
  constructor () {
    super()
    this.state = {
      inputValue: '',
      isSelected: 0,
      keyword: '',
      bookKeyword: '',
      movieKeyword: '',
      musicKeyword: '',
      newKeyword: false
    }
  }
  componentDidMount () {
    fetchJsonp('https://api.douban.com/v2/book/search?q=a')
      .then(response => response.json())
      .then(json => {
        console.log('parsed default book')
        this.onSearch(json, 0)
      })
      .catch(e => console.log('parsed default book failed', e))
    fetchJsonp('https://api.douban.com/v2/movie/top250')
      .then(response => response.json())
      .then(json => {
        console.log('parsed movie250')
        this.onSearch(json, 1)
      })
      .catch(e => console.log('parsed movie250 failed', e))
    fetchJsonp('https://api.douban.com/v2/music/search?q=a')
      .then(response => response.json())
      .then(json => {
        console.log('parsed default music')
        this.onSearch(json, 2)
      })
      .catch(e => console.log('parsed default music failed', e))
  }
  handleClick (index) {
    this.setState((prev, props) => ({
      isSelected: index
    }))
  }
  onSearch (json, index, search, newKeyword) {
    if (index === 0) {
      this.setState((prev, props) => ({
        bookKeyword: json,
        inputValue: search,
        newKeyword: newKeyword
      }))
    } else if (index === 1) {
      this.setState((prev, props) => ({
        movieKeyword: json,
        inputValue: search,
        newKeyword: newKeyword
      }))
    } else if (index === 2) {
      this.setState((prev, props) => ({
        musicKeyword: json,
        inputValue: search,
        newKeyword: newKeyword
      }))
    }
  }

  more (isSelected, inputValue, index) {
    if (isSelected === 0 && !inputValue) {
      fetchJsonp('https://api.douban.com/v2/book/search?q=a&start=' + index)
        .then(response => response.json())
        .then(json => {
          console.log('parsed default more book')
          this.onSearch(json, 0, '', false)
        })
        .catch(e => console.log('parsed default more book failed', e))
    } else if (isSelected === 0 && inputValue) {
      fetchJsonp('https://api.douban.com/v2/book/search?q=' + inputValue + '&start=' + index)
        .then(response => response.json())
        .then(json => {
          console.log('parsed more book')
          this.onSearch(json, 0, '', false)
        })
        .catch(e => console.log('parsed more book failed', e))
    } else if (isSelected === 1 && !inputValue) {
      fetchJsonp('https://api.douban.com/v2/movie/top250?start=' + index)
        .then(response => response.json())
        .then(json => {
          console.log('parsed more movie250')
          this.onSearch(json, 1, '', false)
        })
        .catch(e => console.log('parsed more movie250 failed', e))
    } else if (isSelected === 1 && inputValue) {
      fetchJsonp('https://api.douban.com/v2/movie/search?q=' + inputValue + '&start=' + index)
        .then(response => response.json())
        .then(json => {
          console.log('parsed more movie')
          this.onSearch(json, 1, '', false)
        })
        .catch(e => console.log('parsed more movie failed', e))
    } else if (isSelected === 2 && !inputValue) {
      fetchJsonp('https://api.douban.com/v2/music/search?q=a&start=' + index)
        .then(response => response.json())
        .then(json => {
          console.log('parsed more music')
          this.onSearch(json, 2, '', false)
        })
        .catch(e => console.log('parsed more movie failed', e))
    } else if (isSelected === 1 && inputValue) {
      fetchJsonp('https://api.douban.com/v2/music/search?q=' + inputValue + '&start=' + index)
        .then(response => response.json())
        .then(json => {
          console.log('parsed more movie')
          this.onSearch(json, 2, '', false)
        })
        .catch(e => console.log('parsed more music failed', e))
    }
  }
  render () {
    const inputValue = this.state.inputValue
    const isSelected = this.state.isSelected
    let selectedCls = []
    for (let i = 0; i < 3; i++) {
      if (i === isSelected) { selectedCls[i] = ' active' } else { selectedCls[i] = '' }
    };
    let keyword = this.state.keyword
    let bookKeyword = this.state.bookKeyword
    let movieKeyword = this.state.movieKeyword
    let musicKeyword = this.state.musicKeyword
    const newKeyword = this.state.newKeyword
    if (bookKeyword && isSelected === 0) {
      keyword = bookKeyword
    } else if (movieKeyword && isSelected === 1) {
      keyword = movieKeyword
    } else if (musicKeyword && isSelected === 2) {
      keyword = musicKeyword
    }
    return (
      <div className='tab-container'>
        <Input isSelected={isSelected} onSearch={this.onSearch.bind(this)} />
        <List isSelected={isSelected} keyword={keyword} newKeyword={newKeyword} inputValue={inputValue} more={this.more.bind(this)} />
        <ul className='tab-list' ref='tab'>
          <span className='icons' onClick={this.handleClick.bind(this, 0)} ><img className={'icon' + selectedCls[0]} src={Book} /></span>
          <span className='icons' onClick={this.handleClick.bind(this, 1)} ><img className={'icon' + selectedCls[1]} src={Movie} /></span>
          <span className='icons' onClick={this.handleClick.bind(this, 2)} ><img className={'icon' + selectedCls[2]} src={Music} /></span><br />
          <li className={'tab-item' + selectedCls[0]} onClick={this.handleClick.bind(this, 0)}>图书</li>
          <li className={'tab-item' + selectedCls[1]} onClick={this.handleClick.bind(this, 1)}>电影</li>
          <li className={'tab-item' + selectedCls[2]} onClick={this.handleClick.bind(this, 2)}>音乐</li>
        </ul>
      </div>
    )
  }
}

export default Tab
