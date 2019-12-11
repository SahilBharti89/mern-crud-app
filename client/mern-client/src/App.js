import React from 'react';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Form from './module/form';
import List from './module/list';
import Edit from './module/edit';


function App() {
  return (
    <Router>
      <div className="App">
      
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="https://www.tutofox.com/" style={{color:'orange',fontWeight:'bold'}}>MERN CRUD App</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Employee List</Link>
              </li>
            </ul>
            <Link className="btn btn-info" to="/form">Add Employee</Link>
          </div>
        </nav>
        <div className="container py-4">
          <div className="row">
            <Switch>
              <Route path="/" exact component={List} />
              <Route path="/list" component={List} />
              <Route path="/form"  component={Form} />
              <Route path="/edit/:id"  component={Edit} />
            </Switch>
          </div>  
        </div>
      </div>
    </Router>
  );
}

export default App;
