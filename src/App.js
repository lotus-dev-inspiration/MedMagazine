import React, { Component } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import Header from 'components/layout/header/Header';
import Main from 'components/layout/main/Main';
import Footer from 'components/layout/footer/Footer';
import { userFromToken } from 'services/user-service';
import { getCookie } from 'services/cookie-service';




class App extends Component {
  constructor() {
    super();

    // const token = getCookie("Authorization");

    // if (token) {
    //   userFromToken(token).then(response => {
    //     return response.json();
    //   }).then(data => {
    //     console.log(data);
    //   })
    // }
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Header />
          <Main />
          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
