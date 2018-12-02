import React from 'react';
import {NavLink } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {toggleOpened: false};
  }

  hideMenu = () => {
    this.setState( {toggleOpened: !this.state.toggleOpened} );
  }
  toggleClick = () => {
    this.setState( {toggleOpened: !this.state.toggleOpened} );
  }

  render() {
      return (
       <div className='main-menu'>
       	<ReactCSSTransitionGroup transitionName="menu-appearing" transitionAppear={false} transitionEnterTimeout={300} transitionLeaveTimeout={300} transitionEnter={true} transitionLeave={true}>
        	{this.state.toggleOpened && 
          	<ul className='main-menu__list'>
              <li className='main-menu__item' onClick={this.hideMenu}><NavLink exact to="/" activeClassName='active'>Home</NavLink></li>
              <li className='main-menu__item' onClick={this.hideMenu}><NavLink to="/categories" activeClassName='active'>Categories</NavLink></li>
              <li className='main-menu__item' onClick={this.hideMenu}><NavLink to="/portfolio/gallery" activeClassName='active'>Gallery</NavLink></li>
              <li className='main-menu__item' onClick={this.hideMenu}><NavLink to="/contacts" activeClassName='active'>Contacts</NavLink></li>
         	</ul>}
        </ReactCSSTransitionGroup>
        <div className={`main-menu__toggle ${(this.state.toggleOpened)?'main-menu__toggle--opened':'main-menu__toggle--closed'}`} onClick={this.toggleClick}>
        	<span className='toggle toggle__first'></span>
            <span className='toggle toggle__second'></span>
            <span className='toggle toggle__third'></span>
         </div>
      </div>
      );
   }
  
}