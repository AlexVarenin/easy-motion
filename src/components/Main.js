import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Footer from './Footer';
import WellcomeSpinner from './WellcomeSpinner';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      footerOpened: false,
      blur: 0,
      opacity: 1,
      scale: 1,
      isLoading: true,
      isPerforming: false
    };
    this.startTimer = null;
  }

  componentWillMount() {
    window.scrollTo(0,0);
    this.startTimer = Date.now();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
      if(window.pageYOffset + window.innerHeight + 50 > document.body.scrollHeight)
          this.setState( {footerOpened: true});
      else 
          this.setState( {footerOpened: false});
      let sFactor = window.pageYOffset/document.body.scrollHeight;
      this.setState( {
        blur: 40 * sFactor < 20 ? 40 * sFactor : 20, 
        opacity: 1 - 2 * sFactor > 0.05 ? 1 - 2 * sFactor : 0.05, 
        scale: 1 + sFactor < 1.5 ? 1 + sFactor : 1.5 
      } );
  };

  handleImageLoaded = () => {
    if (Date.now() - this.startTimer  > 1000) {
      this.setState( {isPerforming: true});
      setTimeout(() => {this.setState( {isLoading: false});}, 1000)
    } else {
      this.setState( {isLoading: false});
    }
  };

  handleMainImageLoaded = e => {
   e.target.parentNode.parentNode.children[1].style.display = 'none';
  };

 render() {


    return (
    <div>
    	<figure className='content__img' style={{backgroundImage: 'url(background.svg)', filter: 'blur(' + this.state.blur + 'px)', opacity: this.state.opacity}}>
      	<img
          style={{transform: 'scale('+ this.state.scale +')'}}
          src='banner.png'
          onLoad={($event) => this.handleMainImageLoaded($event)}
          alt='me'
        />
    	</figure>
      <figure className='content__img content__img--min' style={{filter: 'blur(' + this.state.blur + 'px)', opacity: this.state.opacity}}>
        <img
          style={{transform: 'scale('+ this.state.scale +')'}}
          src='banner-min.svg'
          onLoad={this.handleImageLoaded}
          alt='me'
        />
      </figure>
    	<div className='content'>
    		<div className='content__banner'>
    		  <h1 className='content__title'>WOW!<br/> You've found<br/> my studio</h1>
      		<p className='content__sub-title'>Looks like you need<br/> some professional help</p>
      	</div>
      	<p className='content__text'>What can I propose:</p>
      	<ul className='content__list'>
          	<li>Creating realistic animation for you 3d model</li>
          	<li>Making the best rigging you've ever seen</li>
          	<li>Adding special effects</li>
          	<li>A lot of another stuff in Maya for your video, cartoon or game (Unreal Engine 4)</li>
      	</ul>
    	</div>
    	<ReactCSSTransitionGroup transitionName='footer-appearing' transitionAppear={false} transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionEnter={true} transitionLeave={true}>
          { this.state.footerOpened && <Footer /> }
    	</ReactCSSTransitionGroup>
      { this.state.isLoading && <WellcomeSpinner
        customClass={this.state.isPerforming ? 'animated-overlay' : 'no-amination'}
        />}
   </div>
   );
 }
   
}


