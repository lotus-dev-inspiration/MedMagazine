import React, { Component } from 'react';

import Header from './components/layout/header/Header';
import Main from './components/layout/main/Main';
import Footer from './components/layout/footer/Footer';

class App extends Component {
  render() {
    return (
      <React.Fragment>
          <Header/>
          <Main/>
          <Footer/>
      </React.Fragment>
    );
  }
}

export default App;
