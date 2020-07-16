

const Utility = {
    save:(key, value) => {
        localStorage.setItem(key, value);
    },
    get:(key) => {
        return localStorage.getItem(key);
    },
    clear:() => {
        localStorage.clear();
    },
    remove:(key) => {
        localStorage.removeItem(key);
    },
     logout: () => {
        localStorage.removeItem('admin_token');  
        window.location.href = '/sign-in'; 
    }
}
module.exports = Utility;
 
