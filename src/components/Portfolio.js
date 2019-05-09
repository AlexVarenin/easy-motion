import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import WellcomeSpinner from './WellcomeSpinner';


const categories = {
    animation: {id: 1, title: 'Animation'},
    rig: {id: 2, title: 'Rig'},
    vfx: {id: 3, title: 'VFX'},
    gaming: {id: 4, title: 'Gaming'}
  };

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      breadcrumbsClass: ''
    };
  }

  handleImageLoaded = e => {
    e.target.parentNode.parentNode.children[1].style.display = 'none';
    this.setState( {isLoading: false});
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
   }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.pageYOffset > 30) {
      this.setState({breadcrumbsClass: ' gallery__breadcrumbs--left'});
    } else {
      if (this.state.breadcrumbsClass !== '') {
        this.setState({breadcrumbsClass: ' gallery__breadcrumbs--right'});
      }
    }
  }

   render() {
      return (
        <div className='gallery'>
          <div className='gallery__wrapper'>
          {this.props.breadcrumbs &&
            <Link className={`gallery__breadcrumbs${this.state.breadcrumbsClass}`} to={'/categories'}><i className="fas fa-chevron-circle-left" /><span> Categories</span></Link>
          }
          <h1>{ categories[this.props.title].title}</h1>
              {
                this.props.portfolioData.filter( el => el.category.indexOf(categories[this.props.title].id) >= 0).map( (item, index) => 
                  <Link className="gallery__item-wrapper" to={`/${this.props.section}/${this.props.subsection}/${item.id}`} key={index}>
                    <div className='gallery__item' >
                      <div className='gallery__item-cover'>
                        <img
                          src={`https://img.youtube.com/vi/${item.id}/maxresdefault.jpg`}
                          onLoad={($event) => this.handleImageLoaded($event)}
                          alt='youtube pic'
                        />
                        <div className='gallery__item-title'>
                          <h3>{item.title}</h3>
                        </div>
                      </div>
                      <div className='gallery__item-cover--minimal'>
                        <img
                          src={`https://img.youtube.com/vi/${item.id}/default.jpg`}
                          alt='youtube pic min'
                        />
                        <div className='gallery__item-title'>
                          <h3>{item.title}</h3>
                        </div>
                      </div>
                    </div>
                  </Link>) }
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

export default withRouter(connect(mapStateToProps)(Portfolio));
