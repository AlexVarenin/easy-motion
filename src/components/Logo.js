import React from 'react';
import { Link } from 'react-router-dom';

export default class Logo extends React.Component {
  render() {
    return (
    <Link to='/'>
        <div className='logo'>
            <div className='logo__circle'>
              <img src='e.png' alt='easymotion'/>
            </div>
            <div className='logo__txt'>
                <span>asymotion</span>
            </div>
        </div>
    </Link>
    );
  }
}