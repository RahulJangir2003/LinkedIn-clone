import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import { getUserAuth } from './actions';
import { connect } from 'react-redux';
const App = (props) => {
  useEffect(()=>{
    props.getUserAuth();
  },[]);
  return <div>
    <Router>
      <Switch>
        <Route exact path = "/">
          <Login/>
        </Route>
        <Route path="/home">
          <Header></Header>
          <Home></Home>
        </Route>
      </Switch>
    </Router>
  </div>;
};
const mapStateToProps = (state) => {
  return {};
};
// const mapDispatchToProps = (dispatch) => ({
//   getUserAuth: ()=> dispatch(getUserAuth()),
//   });
const mapDispatchToProps = (dispatch) =>{
  return {
    getUserAuth: ()=>dispatch(getUserAuth()),
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(App);
