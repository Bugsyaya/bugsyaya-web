import React from 'react';
import logo from './asset/logoPerso.svg';
import './App.css';
import Navbar from './components/navbar/Navbar'
import { client } from './api'
import SchoolProject from './pages/SchoolProject'
import PersoProject from './pages/PersoProject'
import OtherProject from './pages/OtherProject'

import { ApolloProvider } from '@apollo/react-hooks';
import { Router } from '@reach/router';
import Contact from './pages/Contact';
import OSSProject from './pages/OSSProject';

function App() {

  return (
    <ApolloProvider client={client}>
      <div >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Navbar />
        <Router>
          <SchoolProject path='/school-projects'/>
          <PersoProject path='/perso-projects'/>
          <OSSProject path='/oss-projects'/>
          <OtherProject path='/other-projects'/>
          <Contact path='/contact'/>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
