import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history'; 
import Lanes from './menu/lanes'; 
class App extends React.PureComponent {
  render() {
    const browserHistory = createBrowserHistory(); 
  return (
   
          <Router history={browserHistory}>
              <Lanes /> 
          </Router>  
   
  );

  }

  } 

export default App;
