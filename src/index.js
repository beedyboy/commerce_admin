import React from 'react';
import ReactDOM from 'react-dom'; 
import "./assets/demo/demo.css";
import "./assets/scss/black-dashboard-react.scss";
import "./assets/css/nucleo-icons.css"; 
import 'font-awesome/css/font-awesome.min.css';
import App from './App'; 
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import * as serviceWorker from './serviceWorker';

//optional configuration
const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

ReactDOM.render( 
  <AlertProvider template={AlertTemplate} {...options}>
     <App />
  </AlertProvider>,
 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
