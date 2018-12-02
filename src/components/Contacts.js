import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ContactForm from './ContactForm';

export default class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {formOpened: false};
    this.openForm = this.openForm.bind(this);
  }
    componentWillMount() {
    window.scrollTo(0,0);
  }
   openForm() {
      this.setState( {formOpened: !this.state.formOpened} );
   }

   render() {
      return (
      <div className='contacts'>
          <div className='contact__banner'>
            <h1 className='contacts__title'>Let's make<br/> something great together!</h1>
          </div>
          <ReactCSSTransitionGroup transitionName="form-appearing" transitionAppear={false} transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionEnter={true} transitionLeave={true}>
          { this.state.formOpened && <ContactForm closeForm={this.openForm}/> }
          </ReactCSSTransitionGroup>
          { !this.state.formOpened &&
            <div className='contacts__project-btn'>
              <button className="button button--contacts" onClick={this.openForm}>Start a project</button>
            </div> 
            }
          <div className='contacts__links'>
            <a className='contacts__link contacts__link--phone' href='tel:80660240425'><i className="fas fa-phone" /> <span> +38(066)</span>0240525</a>
            <a className='contacts__link contacts__link--mail' href='mailto:easymotion3d@gmail.com'><i className="fas fa-envelope" />  easymotion3d@gmail.com</a>
        </div>
      </div>
      );
  }
} 
