import { decorate, observable, action, computed } from "mobx"
import { createContext } from "react" ;  
import { backend } from '../Config';  

class MemberStore { 
  
     error = false;
     filter = 'ALL';
     message = '';
     loading = false;
     sent = false;
 
     buyers = [];
     sellers = [];

     setFilter = (data) => {
     	this.filter = data;
     }

     allBuyers = () => { 
      this.loading = true;
      backend.get('buyer').then( res => {  
         if(res.data.status === 200) {
              this.buyers = res.data.data;
         } 
            this.loading = false;
          
      }); 
    }

  allSellers = () => { 
      this.loading = true;
      backend.get('seller').then( res => {  
        if(res.data.status === 200) {
          this.sellers = res.data.data;
     } 
            this.loading = false;
          
      }); 
    }

  
  fetchMember = () => { 
    this.loading = true;
    backend.get('member').then( res => {  
          this.sellers = res.data;
      this.loading = false;
        
    }); 
  }

  removeSeller = (id) => { 
    backend.delete('seller/' + id).then( res => {
      if(res.status === 200) {
        this.allSellers();
        this.message = res.message; 
      }
    })
  }
  toggleSeller = (data) => {
     backend.post('seller/toggle', data).then(res => {
       if (res.data.status === 200) {
        this.allSellers();
       }
     })
    
  }

  removeBuyer = (id) => { 
    backend.delete('buyer/' + id).then( res => {
      if(res.status === 200) {
        this.allBuyers();
        this.message = res.message; 
      }
    })
  }
  get filteredBuyer() {
    switch (this.filter) {
      case 'ALL':
        return this.buyers;
      case 'Active':
        return this.buyers.filter(s => s.status === 'Active');
      case 'Inactive':
        return this.buyers.filter(s => s.status === 'Inactive');
      case 'Deleted':
        return this.buyers.filter(s => s.section === 'Deleted');

      default:
        return this.buyers;
    }
  }

  
  get filteredSeller() {
    switch (this.filter) {
      case 'ALL':
        return this.sellers;
      case 'Active':
        return this.sellers.filter(s => s.status === 'Active');
      case 'Inactive':
        return this.sellers.filter(s => s.status === 'Inactive');
      case 'Deleted':
        return this.sellers.filter(s => s.section === 'Deleted');

      default:
        return this.sellers;
    }
  }
  get info() {
  	return {
      total: this.sellers.length,
      status: this.sellers.filter(cat => cat.status).length,
      // notstatus: this.sellers.filter(cat => !cat.status).length,
    }
   
  }

} 
decorate(MemberStore, { 
  message: observable,
  error: observable,
  filter: observable,
  filteredBuyer: computed,
  filteredSeller: computed,
  info: computed,
  sent: observable,
  loading: observable,
  sellers: observable,
  buyers: observable, 
  allBuyers: action,
  allSellers: action,
  removeBuyer: action,
  removeSeller: action,
  setFilter: action
})

 
export default createContext(new MemberStore())
