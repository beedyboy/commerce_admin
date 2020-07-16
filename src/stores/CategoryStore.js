import { decorate, observable, action, computed, reaction } from "mobx"
import { createContext } from "react" ;  
import { backend } from '../Config';  

class CategoryStore {
  constructor() {  
    this.fetchCategory();  
    reaction(() => this.categories, _ => console.log(this.categories.length))
  }
  
     error = false;
     filter = 'Active';
     message = '';
     loading = false;
     sent = false;

     categories = [] 

     setFilter = (data) => {
     	this.filter = data;
     }

    fetchCategory = () => {
    this.loading = true;
    backend.get('category').then( res => {  
          this.categories = res.data;
      this.loading = false;
        
    }); 
  }

   removeCategory = (id) => { 
    backend.delete('category/' + id).then( res => {
      if(res.status === 200) {
        this.fetchCategory();
        this.message = res.message;
      //  return <Toast opens={true} type="success" message={res.message} />;
        // Toast(true, 'success',  res.message );
      }
    })
  }
  get filteredCategory() {
    switch (this.filter) {
      case 'ALL':
        return this.categories;
      case 'Active':
        return this.categories.filter(s => s.status === 'Active');
      case 'Inactive':
        return this.categories.filter(s => s.status === 'Inactive');
      case 'Deleted':
        return this.categories.filter(s => s.section === 'Deleted');

      default:
        return this.categories;
    }
  }
  get info() {
  	return {
      total: this.categories.length,
      status: this.categories.filter(cat => cat.status).length,
      // notstatus: this.categories.filter(cat => !cat.status).length,
    }
   
  }

} 
decorate(CategoryStore, { 
  message: observable,
  error: observable,
  filter: observable,
  filteredCategory: computed,
  info: computed,
  sent: observable,
  loading: observable,
  categories: observable, 
  fetchCategory: action,
  removeCategory: action,
  setFilter: action
})

 
export default createContext(new CategoryStore())
