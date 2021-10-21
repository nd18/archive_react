import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/login';
import Signup from './components/signup';
import Navbar from './components/Navbar';
import Note from './components/note';
import PrivateRoute from './components/privateRoute';
// const mysql = require('mysql');
// const connection = mysql.createConnection({
//   host: 'scfsdtest.mysql.database.azure.com',
//   user: 'andrea@scfsdtest',
//   password: '3s_B4+J_YfeJvgXtS=JM5gq2@TeYQM$',//password of your mysql db
//   database: 'andreadb'
// });

function App() {
  return (
    <Router basename="/react-portfolio">
      <div className="app">
        <Navbar />
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/note">
            <Note />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
