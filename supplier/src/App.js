import React,{ useEffect} from 'react';
import  { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Form from "./components/form";
import Show from "./components/showForm";
import DeleteForm from "./components/deleteForm";
import {Collapse,Navbar,NavbarBrand,Nav,NavItem} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar bg="white" expand="lg">
      <Navbar.Brand href="/"><h1>supplier</h1></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
      <Nav.Link href="form">Update Form</Nav.Link>
      <Nav.Link href="submitform">Show Form</Nav.Link>
  	  <Nav.Link href="deleteform">Delete Form</Nav.Link>
      </Nav>
      </Navbar.Collapse>
      </Navbar>
        <Switch>
          <Route path='/form' component={Form}/>
          <Route path='/submitform' component={Show}/>
	         <Route path='/deleteform' component={DeleteForm}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
