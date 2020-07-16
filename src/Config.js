import axios from 'axios';
import Utility from './shared/Storage'; 

// baseURL: 'http://developer.devprima.com/api/',
// axios.defaults.baseURL = 'http://localhost:8000/api/'
// axios.defaults.headers.common = {'Authorization': `bearer ${Utility.get('token')}`}
// export default axios;
const serverUrl = 'http://developer.devprima.com/apis/';
export const  backend = axios.create({
  baseURL: serverUrl,
  headers: {
    common: {
      Authorization: `bearer ${Utility.get('token')}`
    }
  }
});
// export const serverUrl = 'http://192.168.0.5/server/' 
// export const serverUrl = 'http://localhost/project/php/smart/'
 