import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import StatusPopup from './StatusPopup';
import Spinner from './Spinner';


Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};

const infoMess = {
  name: { valid: 'Yours / company / organisation name?', error: 'At least 2 letters are required' },
  mail: { valid: 'Your email', error: 'email or tel number should be correct'},
  tel: { valid: 'Your phone number', error: 'tel number or email should be correct'},
  desc: { valid: 'Please provide here a short description', error: 'at least 3 words are required'}
}

const popupMess = {
  success: 'Message was sent successfully!',
  error: 'Error during sending message. Please try again little bit later'
}

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        nameValid: null,
        email: '',
        emailValid: null,
        tel: '',
        telValid: null,
        desc: '',
        descValid: null,
        labelName: infoMess.name.valid,
        labelEmail: infoMess.mail.valid,
        labelTel: infoMess.tel.valid,
        labelDesc: infoMess.desc.valid,
        successMessage: null,
        successPopup: false,
        showSpinner: false
    };
    this.closePopup = this.closePopup.bind(this);
  }

componentWillMount() {
    window.scrollTo(0,0);
  }
  componentDidMount() {
    let start = window.pageYOffset;
    let target = document.querySelector('.contact-form').getBoundingClientRect().top
    let change = target - start - document.querySelector('.header').clientHeight;
    let currentTime = 0;
    const increment = 20;
    const duration = 500;
    let animateScroll = function(){        
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime, start, change, duration);
            window.scrollTo(0, val);
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
    setTimeout(animateScroll,500);
   }

  closeForm = () => {
    this.props.closeForm();
  }

  onNameChange = ( event ) => {
    this.setState({
      name: event.target.value,
      nameValid: this.nameValid(event.target.value),
      labelName: this.nameValid(event.target.value) ? infoMess.name.valid : infoMess.name.error
    });
  }
  onEmailChange = ( event ) => {
    this.setState({
      email: event.target.value,
      emailValid: this.emailValid(event.target.value),
      labelEmail: this.emailValid(event.target.value) ? infoMess.mail.valid : infoMess.mail.error
    });
  }
  onTelChange = ( event ) => {
    this.setState({
      tel: event.target.value,
      telValid: this.telValid(event.target.value),
      labelTel: this.telValid(event.target.value) ? infoMess.tel.valid : infoMess.tel.error
    });
  }
  onDescChange = ( event ) => {
    this.setState({
      desc: event.target.value,
      descValid: this.descValid(event.target.value),
      labelDesc: this.descValid(event.target.value) ? infoMess.desc.valid : infoMess.desc.error
    });
  }

  nameValid( name ) {
    return name.length > 1;
  }

  emailValid( email ) {
    if (~email.search(/.+@.+\..+/i))
      return true;
    return false
  }

  telValid ( tel ) {
    if (tel.length > 0 && ~tel.search(/^([+]?[0-9\s-()]{3,25})*$/i))
      return true;
    return false
  }

  descValid ( text ) {
    if (~text.search(/(\w+\W+){2}\w+/i))
      return true;
    return false
  }

  sendMessage = () => {
        this.setState({showSpinner: true});
        const email = this.state.emailValid ? this.state.email : 'no email';
        const tel = this.state.telValid ? this.state.tel : 'no tel number'
        axios.post('https://easy-motion-api.herokuapp.com/send-email', {
          name: this.state.name,
          contacts: email + ' ' + tel,
          text: this.state.desc
        })
        .then((response) => {
          this.setState({successPopup: true, successMessage: popupMess.success, showSpinner: false});
        }).catch( (error) => {
          this.setState({successPopup: false, successMessage: popupMess.error, showSpinner: false});
        });
    }
  closePopup = () => {
    this.setState({successMessage: null});
  }

  
  render() {
    let isDisabled = !(this.state.nameValid && (this.state.emailValid || this.state.telValid) && this.state.descValid);
    return (
      <div className='contact-form'>
          <h2 className='contact-form__title'>Start a project</h2>
          <p>Thanks for your interest in working with me. Please complete the details below and I’ll get back to you within one business day</p>
          <div className='form'>
            <div className='form__item'>
              <input
                className='form__item-field'
                id='name'
                type='text'
                required
                value={this.state.name}
                onChange={this.onNameChange}
                style={{background: this.state.nameValid === false ? 'rgba(255,0,0,.1)' : 'transparent'}}
              />
              <label
                htmlFor='name'
                className={this.state.nameValid === false ? 'form__error' : 'form__label'}
              >{this.state.labelName}</label>
              <span></span>
            </div>
            <div className='form__contacts'>
              <div className='form__item form__item--mail'>
                <input
                  className='form__item-field'
                  id='mail' type='text'
                  required
                  value={this.state.email}
                  onChange={this.onEmailChange}
                  style={{background: this.state.emailValid === false ? 'rgba(255,0,0,.1)' : 'transparent'}}
                />
                <label
                  htmlFor='mail'
                  className={this.state.emailValid === false ? 'form__error' : 'form__label'}
                >{this.state.labelEmail}</label>
                <span></span>
              </div>
              <div className='form__item form__item--phone'>
                <input
                  className='form__item-field'
                  id='phone'
                  type='text'
                  required
                  value={this.state.tel}
                  onChange={this.onTelChange}
                  style={{background: this.state.telValid === false ? 'rgba(255,0,0,.1)' : 'transparent'}}
                />
                <label
                  htmlFor='phone'
                  className={this.state.telValid === false ? 'form__error' : 'form__label'}
                >{this.state.labelTel}</label>
                <span></span>
              </div>
            </div>
            <div className='form__description'>
                <textarea
                  id='description'
                  className='form__item-field'
                  name='text'
                  required 
                  value={this.state.description}
                  onChange={this.onDescChange}
                  style={{background: this.state.descValid === false ? 'rgba(255,0,0,.1)' : 'transparent'}}
                />
                <span></span>
                <label
                  htmlFor='description'
                  className={this.state.descValid === false ? 'form__error' : 'form__label'}
                >{this.state.labelDesc}</label>
              </div>
            <div className='form__buttons'>
                <button className="button button--form-cancel" onClick={this.closeForm} >Cancel</button>
                <button className={`button button--form-send${isDisabled ? ' button--disabled' : ''}`} onClick={this.sendMessage} disabled={isDisabled}>Send</button>
            </div>
          </div>
          {this.state.successMessage && <StatusPopup message={{text: this.state.successMessage, style: this.state.successPopup}} closePopup={this.closePopup}/>}
          {this.state.showSpinner && <Spinner />}
      </div>
    );
  }
  }

ContactForm.propTypes = {
  closeForm: PropTypes.func
 };
