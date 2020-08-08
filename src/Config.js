import axios from 'axios';
import Utility from './shared/Storage'; 

// baseURL: 'http://developer.devprima.com/api/',
// axios.defaults.baseURL = 'http://localhost:8000/api/'
// axios.defaults.headers.common = {'Authorization': `bearer ${Utility.get('token')}`}
// export default axios;
const env = { 
  production: 'https://bserver-admin.herokuapp.com/api/',
  development: 'http://localhost:8000/api/'
}


const serverUrl = env[process.env];
export const  backend = axios.create({
  baseURL: serverUrl,
  headers: {
    common: {
      Authorization: `bearer ${Utility.get('token')}`
    }
  }
}); 