import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './Home';
import User from './User/User';


const App = () => (
  <Router>
    <Switch>
      <Route path="/user" component={User} />
      <Route path="/" component={Home} />
    </Switch>
  </Router>
);

export default App;
