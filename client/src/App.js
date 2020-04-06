import React,{ useEffect} from 'react';
import  { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import submitForm from "./components/form";
import SearchForm from "./components/searchForm";
import ShowAllForm from "./components/showallForm";
import {Collapse,Navbar,NavbarBrand,Nav,NavItem} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar bg="white" expand="lg">
      <Navbar.Brand href="/"><h1>supermarket</h1></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
      <Nav.Link href="form">Submite Form</Nav.Link>
      <Nav.Link href="searchform">Search Form</Nav.Link>
  	  <Nav.Link href="showallform">ShowAllForm</Nav.Link>
      </Nav>
      </Navbar.Collapse>
      </Navbar>
        <Switch>
          <Route path='/form' component={submitForm}/>
          <Route path='/searchform' component={SearchForm}/>
	        <Route path='/showallform' component={ShowAllForm}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
