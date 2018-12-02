import React from 'react';
import { BrowserRouter,Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Contacts from './components/Contacts';
import Section from './components/Section';
import Gallery from './components/Gallery';

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
}