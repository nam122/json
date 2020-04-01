import React,{ useEffect} from 'react';
import  { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Form from "./components/form";
import Show from "./components/showForm";
import DeleteForm from "./components/deleteForm";

function App() {
  return (
    <Router>
      <div className="App">
	<h1>supplier</h1>
        <ul>
          <li><Link to="form">update Form</Link></li>
          <li><Link to="show">Show all order</Link></li>
          <li><Link to="delete">Delete order</Link></li>
        </ul>
        <Switch>
          <Route path='/form' component={Form}/>
          <Route path='/show' component={Show}/>
          <Route path='/delete' component={DeleteForm}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
