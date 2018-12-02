import React from 'react';
import Logo from './Logo';
import MainMenu from './MainMenu';

export default class Header extends React.Component {
  render() {
    return (
    <div className='header'>
    	<Logo />
    	<MainMenu />
    </div>
    );
  }
}