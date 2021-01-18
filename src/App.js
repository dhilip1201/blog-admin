import './App.css';
import {Switch,  Route } from "react-router-dom";
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getInitialData, isUserLoggedIn } from './actions';
import Blogs from './containers/Blogs';
import Comments from './containers/Comments';

function App() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn())
    }
    if(auth.authenticate){
      dispatch(getInitialData());
    }
    
    
  }, [auth.authenticate])
  return (
    <div className="App">
      
        
         <Switch>
           <PrivateRoute path="/" exact component={Home} /> 
           <PrivateRoute path="/blogs"  component={Blogs} />
           <PrivateRoute path="/comments"  component={Comments} />
           <Route path="/signin"  component={Signin} />
           <Route path="/signup"  component={Signup} />
          
         </Switch>
        
     
    </div>
  );
}

export default App;
