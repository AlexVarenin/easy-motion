import React from 'react';
import PropTypes from 'prop-types';

export default class StatusPopup extends React.Component {
  constructor(props) {
    super(props);
    this.closePopup = this.closePopup.bind(this);
  }
  render() {
    return (
    <div className='popup-layer'>
        <div className={`popup ${this.props.message.style ? 'popup--success' : 'popup--error'}`}>
        <div className='popup__close-btn' onClick={this.closePopup}>
            <span className='popup-btn popup-btn__first'></span>
            <span className='popup-btn popup-btn__second'></span>
         </div>
            <p>{this.props.message.text}</p>
         </div>
      </div>
    );
  }
  closePopup() {
    this.props.closePopup();
  }
}
StatusPopup.propTypes = {
  closePopup: PropTypes.func
 };