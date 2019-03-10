import React from 'react';
import { BrowserRouter,Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Contacts from './components/Contacts';
import Section from './components/Section';
import Gallery from './components/Gallery';
import axios from 'axios';
import store from './store';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className='main-content'>
           <Header />
           <Switch>
                <Route exact path='/' component={Main}/>
                <Route path='/contacts' component={Contacts}/>
                <Route exact path='/:section' component={Section}/>
                <Route path='/:section/:subsection' component={Gallery}/>
            </Switch>
        </div>
      </BrowserRouter>
      );
  }

  componentDidMount() {
    axios.get('https://easy-motion-api.herokuapp.com/movies').then(response => {
      store.dispatch({
        type: 'UPDATE_PORTFOLIO_DATA',
        portfolioData: response.data
      });
    });
  }
}