import { decorate, observable, action, computed, reaction } from "mobx"
import { createContext } from "react" ; 
import { backend } from '../Config'; 
import Utility from "../shared/Storage";


class UserStore {
  constructor() {
    this.fetchUsers();
    this.getProfile()
    reaction(() => this.users, _ => console.log(this.users.length))
  }

     isAuthenticated = false;
     error = null;
     loading = false;
     emailExist = false;

    users = [];
    profiles = [];

   addUser = (User) => {
    
    // this.users.push({ ...User, id: uuid() })
  }
  fetchUsers = () => {
    this.loading = true;
    backend.get('staff').then( res => {  
          this.users = res.data;
      this.loading = false;
        
    }); 
  }
  confirmEmail = (data) => {
    backend.get('staff/' + data + '/exist').then( res => { 
      this.emailExist = res.data.exist;
    })
  }
   
      
  getProfile = () => {
    backend.get('staff/get/profile/').then( res => {
      // console.log('pay', res.data.data.fullname);
      if(res.data.status === 200) {
        this.profiles = res.data.data;
      }
    })
  }
   login = (Admin) => {
    this.loading = true;
    this.error = null;
    backend.post('staff/auth', Admin).then( res => { 
      if(res.data.status === 200) { 
        this.loading = false;
        Utility.save('admin_token', res.data.token); 
        this.isAuthenticated = true; 
      }
    })
  }

   logOut = () => {
    Utility.clear();
  }
  loginSuccessful = () => {
    this.isAuthenticated = false;
  }
   toggleUser = (data) => {
     backend.post('staff/toggle', data).then(res => {
       if (res.data.status === 200) {
        this.fetchUsers();
       }
     })
    
  }

  removeUser = (id) => {
    backend.delete('staff/' + id).then( res => {
      if(res.status === 200) {
        this.fetchUsers();
        this.message = res.message; 
      }
    })
  }
  get info() {
    var data = [];
     this.users.map((res) => {
       const status = res.status === "Active" ? true : false;
       const d = {
         id: res.id,
         fullname: res.fullname,
         username: res.username,
         email: res.email,
         phone: res.phone,
         password: res.password,
         role: res.role,
         status: status,
         roleName: res.roleName,
         created_at: res.created_at,
         updated_at: res.updated_at
       }
       data.push(d);
     });
     return data;
     
   }
   get profile() {
    var data = []
    const d = {
      id: this.profiles.id,
      fullname: this.profiles.fullname,
      username: this.profiles.username,
      email: this.profiles.email,
      phone: this.profiles.phone,
      password: this.profiles.password,
      status: this.profiles.status,
      image: this.profiles.image,
      role: this.profiles.role,
      roleName: this.profiles.roleName,
      created_at: this.profiles.created_at,
      updated_at: this.profiles.updated_at
    }
     
       data.push(d);  
     return data; 
    }
    
   get stat() {
    return {
      total: this.users.length,
      completed: this.users.filter(User => User.completed).length,
      notCompleted: this.users.filter(User => !User.completed).length,
    }
  }
}
decorate(UserStore, {
  isAuthenticated: observable,
  error: observable,
  loading: observable,
  users: observable,
  profiles: observable,
  emailExist: observable,
  addUser: action,
  fetchUsers: action,
  removeUser: action,
  getProfile: action,
  confirmEmail: action,
  login: action,
  logOut: action,
  loginSuccessful: action,
  info: computed,
  stat: computed, 
  profile: computed, 
  toggleUser: action
})

export default createContext(new UserStore())
