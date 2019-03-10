import React from 'react';
import YouTube from "react-youtube";
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import WellcomeSpinner from './WellcomeSpinner';

import axios from 'axios';
import store from '../store';

const categories = {
    animation: 1,
    rig: 2,
    vfx: 3,
    gaming: 4
  };

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerWidth: '100%',
      playerHeight: '100%',
      videoId: '',
      isLoading: true,
      arrowLeft: {
        display: 'none'
      },
      arrowRight: {
        display: 'none'
      }
    };
    this.touchStart = 0;
    this.timer = null;
    this.scrollPosition = null;
  }

  componentDidMount() {
    this.blockScroll(true);
    this.setState({
      videoId: this.props.match.params.id
    });
  }

  componentWillUnmount() {
    this.blockScroll(false);
  }

  blockScroll(block) {
    const body = document.body;
    if (block) {
      this.scrollPosition = window.pageYOffset;
      body.style.position = 'fixed';
      body.style.top = `-${this.scrollPosition}px`;
      body.style.left = 0;
    } else {
      body.style.position = 'static';
      window.scrollTo(0, this.scrollPosition);
    }
  }

  toggleClick = () => {
    this.props.history.push(this.props.match.url.substring(0,this.props.match.url.lastIndexOf('/')));
  }

  onPlayerReady = (event) => {
    event.target.playVideo();
    this.timer = setTimeout(this.onPlay, 3000);
  }

  get sectionVideos(){
    if (this.props.match.url.substring(1,this.props.match.url.lastIndexOf('/')).split('/')[1] === 'gallery') {
      return this.props.portfolioData;
    }
    return this.props.portfolioData.filter(item => item.category.indexOf(categories[this.props.match.url.substring(1,this.props.match.url.lastIndexOf('/')).split('/')[1]]) > -1)
  }

  nextVideo = () => {
    this.setState({isLoading: true});
    const indx = this.sectionVideos.findIndex(item => item.id === this.state.videoId);
    if (indx + 1 === this.sectionVideos.length) {
      this.setState({videoId: this.sectionVideos[0].id});
      this.props.history.push(`${this.props.match.url.substring(0,this.props.match.url.lastIndexOf('/'))}/${this.sectionVideos[0].id}`);
    } else {
      this.setState({videoId: this.sectionVideos[indx + 1].id});
      this.props.history.push(`${this.props.match.url.substring(0,this.props.match.url.lastIndexOf('/'))}/${this.sectionVideos[indx + 1].id}`);
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(this.onPlay, 2000);
  }

  prevVideo = () => {
    this.setState({isLoading: true});
    const indx = this.sectionVideos.findIndex(item => item.id === this.state.videoId);
    if (indx === 0) {
      this.setState({videoId: this.sectionVideos[this.sectionVideos.length - 1].id});
      this.props.history.push(`${this.props.match.url.substring(0,this.props.match.url.lastIndexOf('/'))}/${this.sectionVideos[this.sectionVideos.length - 1].id}`)
    } else {
      this.setState({videoId: this.sectionVideos[indx - 1].id});
      this.props.history.push(`${this.props.match.url.substring(0,this.props.match.url.lastIndexOf('/'))}/${this.sectionVideos[indx - 1].id}`)
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(this.onPlay, 2000);
  }

  handleTouchStart = (event) => {
    this.touchStart = event.changedTouches[0].pageX;
  }

  handleTouchMove = (event) => {
    if (this.touchStart > event.changedTouches[0].pageX) {
      this.setState({
        arrowLeft: {
          display: 'none'
        },
        arrowRight: {
          top: event.changedTouches[0].pageY - 50 - window.pageYOffset,
          left: event.changedTouches[0].pageX - 50,
          display: 'block'
        },
      })
    }
    else if (this.touchStart  < event.changedTouches[0].pageX) {
      this.setState({
        arrowRight: {
          display: 'none'
        },
        arrowLeft: {
          top: event.changedTouches[0].pageY - 50 - window.pageYOffset,
          left: event.changedTouches[0].pageX - 50, 
        },
      })
    }
  }

  handleTouchEnd = (event) => {
    this.setState({
        arrowRight: {display: 'none'},
        arrowLeft: {display: 'none'}
    })
    if (this.touchStart - 10 > event.changedTouches[0].pageX) {
      this.nextVideo();
    } else if (this.touchStart + 10 < event.changedTouches[0].pageX) {
      this.prevVideo()
    }
  }

  onPlay = () => {
    this.setState({isLoading: false});
  }

  render() {
    const videoItem = this.sectionVideos.filter(item => item.id === this.state.videoId)[0];
    const title = videoItem ? videoItem.title : '';
    const description = videoItem ? videoItem.description: '';
    const opt = {playerVars: { autoplay: 1}, width: '100%', height: '100%' };

    return (
      <div
        className='popup-layer popup-layer--video'
        onTouchStart={event => this.handleTouchStart(event)}
        onTouchMove={event => this.handleTouchMove(event)}
        onTouchEnd={event => this.handleTouchEnd(event)}
      >
        <div className='video__close-btn' onClick={this.toggleClick}>
          <span className='close-btn close-btn__first'></span>
          <span className='close-btn close-btn__second'></span>
        </div>
        <a className="video__button video__button--left" onClick={this.prevVideo}><i className="fas fa-chevron-left" /></a>
        <a className="video__button video__button--right" onClick={this.nextVideo}><i className="fas fa-chevron-right" /></a>
        <div
          className="video__button-mob"
          style={this.state.arrowLeft}
        ><i className="fas fa-chevron-left" /></div>
        <div
          className="video__button-mob"
          style={this.state.arrowRight}
        ><i className="fas fa-chevron-right" /></div>
        <div className='video'>
          <div className='video__video'>
           <YouTube 
              videoId={this.props.match.params.id}
              opts={opt}
              onReady={this.onPlayerReady}
              onPlay={this.onPlay}
            />
          </div>
          <div className='video__desc'>
            <h3><i className="fas fa-play-circle" /> {title}</h3>
            <p>{description}</p>
          </div>
        </div>
        { this.state.isLoading && <WellcomeSpinner
            customClass={'no-amination'}
          />}
      </div>
      );
  }
}

const mapStateToProps = function(store) {
  return {
    portfolioData: store.portfolioState.portfolioData
  };
}

export default withRouter(connect(mapStateToProps)(Video));