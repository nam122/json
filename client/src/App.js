import React,{ useEffect} from 'react';
import  { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Form from "./components/form";
import SearchForm from "./components/searchForm";
import ShowAllForm from "./components/showallForm";

function App() {
  return (
    <Router>
      <div className="App">
	<h1>supermarket</h1>
        <ul>
          <li><Link to="form">Submite Form</Link></li>
          <li><Link to="searchform">Search Form</Link></li>
	  <li><Link to="showallform">ShowAllForm</Link></li>
        </ul>
        <Switch>
          <Route path='/form' component={Form}/>
          <Route path='/searchform' component={SearchForm}/>
	  <Route path='/showallform' component={ShowAllForm}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
