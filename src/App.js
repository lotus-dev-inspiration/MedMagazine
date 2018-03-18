import React, { Component } from 'react';

import {BrowserRouter as Router} from 'react-router-dom';
import Header from 'components/layout/header/Header';
import Main from 'components/layout/main/Main';
import Footer from 'components/layout/footer/Footer';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Header/>
          <Main/>
          <Footer/>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
