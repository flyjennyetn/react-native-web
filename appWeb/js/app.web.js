/**
 * Created by flyjennyetn on 2016-10-24.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Navigator
} from 'react-native';

import {
  Router,
  Route,
  Link,
  IndexRoute,
  Redirect,
  IndexLink,
  browserHistory
} from 'react-router';

import Main from './containers/Main';
// import Splash from './containers/Splash/';
// import Main from './containers/Main';
import Login from './containers/Login';
// import Quizzes from './containers/Courses/Quizzes'

// import User from './containers/User/';
// import UserAccount from './containers/User/Account';
// import UserMoile from './containers/User/Moile';
// import UserPassword from './containers/User/Password';
// import WebViews from './containers/Web/WebViews';
// import Activity from './containers/Activity/';


class Root extends Component {
  render() {
    const {
      children
    } = this.props;
    return children
  }
}

class App extends Component {

  constructor(props) {
      super(props);
  }

  render() {
      return (
        <Router history={browserHistory}>
          <Route path="/" component={Root}>
              <IndexRoute component={Login} />
              <Route path="main" component={Main} />
          </Route>
        </Router>
      );
  }
}

export default App;