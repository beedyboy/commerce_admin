import { decorate, observable, action, computed, reaction } from "mobx"
import { createContext } from "react" ; 
// import  Utility from "../shared/Storage";
import { backend } from '../Config'; 
// import Toast  from '../Config'; 
// import  Toast from "../shared/Toast";
// import axios from 'axios';

class RoleStore {
  constructor() {
    this.fetchRoles(); 
    // <Toast opens={true} type="success" message='this is the message' />
    // Toast(true, 'error', 'this is the message' );
    reaction(() => this.roles, _ => console.log(this.roles.length))
  }
  
     error = false;
     message = '';
     loading = false;
     sent = false;

     roles = [] 

    fetchRoles = () => {
    this.loading = true;
    backend.get('role').then( res => {  
          this.roles = res.data;
      this.loading = false;
        
    }); 
  }

   removeRole = (id) => {
    // this.roles = this.roles.filter(Role => Role.id !== id)
    console.log(id);
    backend.delete('role/' + id).then( res => {
      if(res.status === 200) {
        this.fetchRoles();
        this.message = res.message;
        // return <Toast opens={true} type="success" message={res.message} />;
      }
    })
  }
  get info() {
   var data = []
    this.roles.map(res => {
      const d = {
        id: res.id,
        name: res.name,
        created_at: res.created_at,
        updated_at: res.updated_at,
        priviledges: JSON.parse(res.priviledges)
      }
      data.push(d);
    });
    return data;
    
  }

} 
decorate(RoleStore, { 
  message: observable,
  error: observable,
  info: computed,
  sent: observable,
  loading: observable,
  roles: observable, 
  removeRole: action
})

 
export default createContext(new RoleStore())
