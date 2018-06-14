import React, { Component } from 'react'

import './index.css'

import Tags from './tags'
import Author from './author'
import Casts from './casts'
import Directors from './directors'
import Genres from './genres'
import Publisher from './publisher'

class Item extends Component {
  constructor () {
    super()
    this.state = {
      isSeleted: false
    }
  }
  handleClick () {
    this.setState({
      itemSelected: !this.state.itemSelected
    })
  }
  render () {
    let itemSelected = this.state.itemSelected
    let selectedCls = itemSelected ? ' active' : ''

    const books = this.props.books
    const movie = this.props.movie
    const music = this.props.music
    if (books) {
      return (
        <div className='item-container'>
          <div className='picture-container' onClick={this.handleClick.bind(this)}>
            <img className='picture' src={books.image} />
          </div>
          <div className='detail-container' onClick={this.handleClick.bind(this)}>
            <span><b>名称：</b>{books.title} </span><br />
            <div className='tags'>{books.tags.map((item, index) => {
              return <Tags item={item} key={index} />
            })}</div>
            <span><b>作者：</b>{books.author.map((item, index) => {
              return <Author booksAuthor={item} key={index} />
            })}</span><br />
            <span><b>评分：</b>{books.rating.average} </span><br />
            <span><b>时间：</b>{books.pubdate} </span>
          </div>
          <div className={'allDetail-container' + selectedCls}>
            <div className='back' onClick={this.handleClick.bind(this)}>&nbsp;&nbsp;<b>←</b></div>
            <div className='top-panel'>《{books.title}》</div>
            <div className='moreDetail-container'>
              <div className='picture-container'>
                <img className='bigPicture' src={books.image} />
              </div>
              <div className='superDetail-container'>
                <span><b>名称：</b>{books.title} </span><br />
                <span><b>作者：</b>{books.author.map((item, index) => {
                  return <Author booksAuthor={item} key={index} />
                })}</span><br />
                <span><b>出版社：</b>{books.publisher} </span><br />
                <span><b>日期：</b>{books.pubdate} </span><br />
                <span><b>评分：</b>{books.rating.average} </span><br />
                <span><b>价钱：</b>{books.price} </span><br />
                <div className='tags'>{books.tags.map((item, index) => {
                  return <Tags item={item} key={index} />
                })}</div>
              </div>
              <div className='bookSummary'>
                <h2>&nbsp;简介</h2>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{books.summary}</p>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (movie) {
      return (
        <div className='item-container'>
          <div className='picture-container' onClick={this.handleClick.bind(this)}>
            <img className='picture' src={movie.images.small} />
          </div>
          <div className='detail-container' onClick={this.handleClick.bind(this)}>
            <span className='movieTitle'><b>{movie.title}-{movie.year}</b></span><br />
            <div className='tags'>{movie.genres.map((item, index) => {
              return <Genres genres={item} key={index} />
            })}</div>
            <span className='movieCasts'>{movie.casts.map((item, index) => {
              return <Casts casts={item} key={index} index={0} />
            })}</span><br />
            <span><b>评分：</b>{movie.rating.average} </span>
          </div>
          <div className={'allDetail-container' + selectedCls}>
            <div className='back' onClick={this.handleClick.bind(this)}>&nbsp;&nbsp;<b>←</b></div>
            <div className='top-panel'>《{movie.title}》</div>
            <div className='moreDetail-container'>
              <div className='bigPicture-container'>
                <img className='bigBigPicture' src={movie.images.medium} />
              </div>
              <div className='movieSummary'>
                <h2>&nbsp;简介</h2>
                <span><b>名称：</b>{movie.title} </span>
                <div className='tags'>{movie.genres.map((item, index) => {
                  return <Genres genres={item} key={index} />
                })}</div>
                <span><b>上映时间:</b>{movie.year} </span><br />
                <span className='movieDirectors'><b>导演：</b>{movie.directors.map((item, index) => {
                  return <Directors item={item} key={index} />
                })}</span><br />
              </div>
              <div className='castsPicture'>
                <h2>&nbsp;演员</h2>
                <div className='movieCastsPicture'>{movie.casts.map((item, index) => {
                  return <Casts casts={item} key={index} index={1} />
                })}</div>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (music) {
      return (
        <div className='item-container'>
          <div className='picture-container' onClick={this.handleClick.bind(this)}>
            <img className='picture' src={music.image} />
          </div>
          <div className='detail-container' onClick={this.handleClick.bind(this)}>
            <span><b>名称：</b>{music.title} </span><br />
            <span><b>作者：</b>{
              music.author
                ? music.author.map((item, index) => {
                  return <Author musicAuthor={item} key={index} />
                }) : <span>无</span>
            }
            </span><br />
            <span><b>评分：</b>{music.rating.average} </span><br />
          </div>
          <div className={'allDetail-container' + selectedCls}>
            <div className='back' onClick={this.handleClick.bind(this)}>&nbsp;&nbsp;<b>←</b></div>
            <div className='top-panel'>《{music.title}》</div>
            <div className='moreDetail-container'>
              <div className='picture-container'>
                <img className='bigPicture' src={music.image} />
              </div>
              <div className='superDetail-container'>
                <span><b>名称：</b>{music.title} </span><br />
                <div className='tags'>{music.tags.map((item, index) => {
                  return <Tags item={item} key={index} />
                })}</div>
                <span><b>作者：</b>{
                  music.author
                    ? music.author.map((item, index) => {
                      return <Author musicAuthor={item} key={index} />
                    }) : <span>无</span>
                }
                </span><br />
                <span><b>发布商：</b>
                  {music.attrs.publisher
                    ? music.attrs.publisher.map((item, index) => {
                      return <Publisher item={item} key={index} />
                    })
                    : <span>无</span>
                  }
                </span><br />
                <span><b>发布时间：</b>{music.attrs.pubdate} </span><br />
                <span><b>评分：</b>{music.rating.average} </span><br />
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Item
