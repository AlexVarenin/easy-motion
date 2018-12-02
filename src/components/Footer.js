import React from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends React.Component {
  render() {
    return (
        <div className="footer">
            <h2 className="footer__tilte">Interested?</h2>
            <p className="footer__sub-tilte"> So just see my Portfolio</p>
            <Link to="/portfolio/gallery">
              <button className="button button--portfolio">See Portfolio</button>
            </Link>
        </div>
    );
  }
}