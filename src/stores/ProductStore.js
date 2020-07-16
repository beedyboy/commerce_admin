import { decorate, observable, action, computed, reaction } from "mobx"
import { createContext } from "react" ;  
import { backend } from '../Config';  

class ProductStore {
  constructor() {  
    this.fetchProduct();  
    reaction(() => this.products, _ => console.log(this.products.length))
  }
  
     error = false;
     filter = 'ALL';
     message = '';
     loading = false;
     sent = false;

     products = [] 

     setFilter = (data) => {
     	this.filter = data;
     }

    fetchProduct = () => { 
    this.loading = true;
    backend.get('product').then( res => {  
          this.products = res.data;
      this.loading = false;
        
    }); 
  }

   removeProduct = (id) => { 
    backend.delete('product/' + id).then( res => {
      if(res.status === 200) {
        this.fetchProduct();
        this.message = res.message;
      //  return <Toast opens={true} type="success" message={res.message} />;
        // Toast(true, 'success',  res.message );
      }
    })
  }
  get filteredProduct() {
    switch (this.filter) {
      case 'ALL':
        return this.products;
      case 'Active':
        return this.products.filter(s => s.status === 'Active');
      case 'Inactive':
        return this.products.filter(s => s.status === 'Inactive');
      case 'Deleted':
        return this.products.filter(s => s.section === 'Deleted');

      default:
        return this.products;
    }
  }
  get info() {
  	return {
      total: this.products.length,
      status: this.products.filter(cat => cat.status).length,
      // notstatus: this.products.filter(cat => !cat.status).length,
    }
   
  }

} 
decorate(ProductStore, { 
  message: observable,
  error: observable,
  filter: observable,
  filteredProduct: computed,
  info: computed,
  sent: observable,
  loading: observable,
  products: observable, 
  fetchProduct: action,
  removeProduct: action,
  setFilter: action
})

 
export default createContext(new ProductStore())
