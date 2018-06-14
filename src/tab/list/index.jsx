import React, { Component } from 'react'
import Item from './item'

import './index.css'

class List extends Component {
  constructor () {
    super()
    this.state = {
      scrollTop1: '',
      scrollTop2: '',
      scrollTop3: '',
      count1: 20,
      count2: 20,
      count3: 20,
      bookKeyword: [],
      movieKeyword: [],
      musicKeyword: []
    }
  }
  handleScroll (e) {
    if (this.refs.bodyBox1) {
      this.setState((prev, props) => ({
        scrollTop1: this.refs.bodyBox1.scrollTop
      }))
    }
    if (this.refs.bodyBox2) {
      this.setState((prev, props) => ({
        scrollTop2: this.refs.bodyBox2.scrollTop
      }))
    }
    if (this.refs.bodyBox3) {
      this.setState((prev, props) => ({
        scrollTop3: this.refs.bodyBox3.scrollTop
      }))
    }
  }
  componentDidMount () {
    const More = this.props.more
    let timeoutId
    let callback = () => {
      if (this.refs.bodyBox1 && this.refs.wrapper) {
        const wrapper = this.refs.wrapper
        const top = wrapper.getBoundingClientRect().top
        const windowHeight = this.refs.bodyBox1.clientHeight + 63.2
        if (top && top < windowHeight) {
          // 证明 wrapper 已经被滚动到暴露在页面可视范围之内了
          More(this.props.isSelected, this.props.inputValue, this.state.count1)
          this.setState((prev, props) => ({
            count1: this.state.count1 + 20,
            bookKeyword: this.state.bookKeyword.concat(this.props.keyword.books)
          }))
        }
      }
      if (this.refs.bodyBox2 && this.refs.wrapper) {
        const wrapper = this.refs.wrapper
        const top = wrapper.getBoundingClientRect().top
        const windowHeight = this.refs.bodyBox2.clientHeight + 63.2
        if (top && top < windowHeight) {
          // 证明 wrapper 已经被滚动到暴露在页面可视范围之内了
          More(this.props.isSelected, this.props.inputValue, this.state.count2)
          this.setState((prev, props) => ({
            count2: this.state.count2 + 20,
            movieKeyword: this.state.movieKeyword.concat(this.props.keyword.subjects)
          }))
        }
      }
      if (this.refs.bodyBox3 && this.refs.wrapper) {
        const wrapper = this.refs.wrapper
        const top = wrapper.getBoundingClientRect().top
        const windowHeight = this.refs.bodyBox3.clientHeight + 63.2
        if (top && top < windowHeight) {
          // 证明 wrapper 已经被滚动到暴露在页面可视范围之内了
          More(this.props.isSelected, this.props.inputValue, this.state.count3)
          this.setState((prev, props) => ({
            count3: this.state.count3 + 20,
            musicKeyword: this.state.musicKeyword.concat(this.props.keyword.musics)
          }))
        }
      }
    }
    this.refs.wrapper.addEventListener('scroll', () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      // 如果在50ms 以内没有执行scroll 就会执行callBack，如果有下一次滚动，定时器就会被清空
      timeoutId = setTimeout(callback, 50)
    }, false)
  }
  shouldComponentUpdate (nextProps) {
    if (this.props.isSelected === nextProps.isSelected && this.props.keyword === nextProps.keyword) {
      return false
    }
    return true
  }
  componentDidUpdate (prevProps) {
    if (prevProps.isSelected !== this.props.isSelected) {
      if (this.refs.bodyBox1 && this.props.isSelected === 0) {
        this.refs.bodyBox1.scrollTo(0, this.state.scrollTop1)
      }
      if (this.refs.bodyBox2 && this.props.isSelected === 1) {
        this.refs.bodyBox2.scrollTo(0, this.state.scrollTop2)
      }
      if (this.refs.bodyBox3 && this.props.isSelected === 2) {
        this.refs.bodyBox3.scrollTo(0, this.state.scrollTop3)
      }
    }
    if (prevProps.isSelected === this.props.isSelected && this.props.newKeyword) {
      if (this.refs.bodyBox1 && this.props.isSelected === 0) {
        this.refs.bodyBox1.scrollTo(0, 0)
        this.setState((prev, props) => ({
          bookKeyword: []
        }))
      }
      if (this.refs.bodyBox2 && this.props.isSelected === 1) {
        this.refs.bodyBox2.scrollTo(0, 0)
        this.setState((prev, props) => ({
          movieKeyword: []
        }))
      }
      if (this.refs.bodyBox3 && this.props.isSelected === 2) {
        this.refs.bodyBox3.scrollTo(0, 0)
        this.setState((prev, props) => ({
          musicKeyword: []
        }))
      }
    }
  }
  render () {
    const keyword = this.props.keyword
    let newKeyword = this.props.newKeyword
    let books, movie, music
    if (keyword.books) {
      if (newKeyword) {
        books = keyword.books
      } else {
        books = this.state.bookKeyword.concat(keyword.books)
      }
      if (keyword.books.length < 20) {
        return (
          <div className='list-container' onScroll={this.handleScroll.bind(this)} ref='bodyBox1'>
            {books.map((item, index) => {
              return <Item books={item} key={index} />
            })}
          </div>
        )
      } else {
        return (
          <div className='list-container' onScroll={this.handleScroll.bind(this)} ref='bodyBox1'>
            {books.map((item, index) => {
              return <Item books={item} key={index} />
            })}
            <div className='wrapper' ref='wrapper'>加载更多...</div>
          </div>
        )
      }
    } else if (keyword.subjects) {
      if (newKeyword) {
        movie = keyword.subjects
      } else {
        movie = this.state.movieKeyword.concat(keyword.subjects)
      }
      if (keyword.subjects.length < 20) {
        return (
          <div className='list-container' onScroll={this.handleScroll.bind(this)} ref='bodyBox2'>
            {movie.map((item, index) => {
              return <Item movie={item} key={index} />
            })}
          </div>
        )
      } else {
        return (
          <div className='list-container' onScroll={this.handleScroll.bind(this)} ref='bodyBox2'>
            {movie.map((item, index) => {
              return <Item movie={item} key={index} />
            })}
            <div className='wrapper' ref='wrapper'>加载更多...</div>
          </div>
        )
      }
    } else if (keyword.musics) {
      if (newKeyword) {
        music = keyword.musics
      } else {
        music = this.state.musicKeyword.concat(keyword.musics)
      }
      if (keyword.musics.length < 20) {
        return (
          <div className='list-container' onScroll={this.handleScroll.bind(this)} ref='bodyBox3'>
            {music.map((item, index) => {
              return <Item music={item} key={index} />
            })}
          </div>
        )
      } else {
        return (
          <div className='list-container' onScroll={this.handleScroll.bind(this)} ref='bodyBox3'>
            {music.map((item, index) => {
              return <Item music={item} key={index} />
            })}
            <div className='wrapper' ref='wrapper'>加载更多...</div>
          </div>
        )
      }
    } else {
      return (
        <div className='wrapper' ref='wrapper'>正在加载...</div>
      )
    }
  }
}

export default List
