import React, {Fragment, useEffect, useLayoutEffect, useContext, useState} from 'react';
import { observer } from "mobx-react"
import{ Button, Card, CardBody, FormGroup, Input, Label, Modal, ModalBody, ModalFooter } from 'reactstrap'; 
import dataHero from 'data-hero'; 
import { backend } from '../../../Config';
import RoleStore from '../../../stores/RoleStore';
import UserStore from '../../../stores/UserStore';
   
const schema = {
  fullname:  {
    isEmpty: false,
    min: 2,
    message: 'A valid fullname is required'
  },
  role: { 
    isEmpty: false,
    message: 'You must choose a role'
  },
  username:  {
   isEmpty: false,
   min: 6,
   message: 'A valid username is required'
 },
 password:  {
  isEmpty: false,
  message: 'Password is invalid'
},
  email: {
    min: 8,
    max: 50,
    email: true,
    message: 'Email is not valid'
  }
};  

const AddStaff = ({ handleClose, open, mode, initial_data}) => {  
  const userStore = useContext(UserStore);
  const roleStore = useContext(RoleStore);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [formState, setFormState] = useState({
    isValid: false, 
    values: {
      id: '',
      fullname: '',
      username: '',
      email: '',
      password: '',
      role: ''
    },
    touched: {},
    errors: {}
  });
  const { info: roles } = roleStore; 
  const { emailExist, confirmEmail, fetchUsers } = userStore;  
    
   
  useLayoutEffect(() => { 
     let shouldSet =  typeof initial_data !== 'undefined' ? true : false;
    if(shouldSet) {
      const data = initial_data && initial_data.id;  
      setFormState(state => ({
        ...state,
        values: {
          ...state.values,
          id: data && initial_data.id,
          fullname: data && initial_data.fullname,
          username: data && initial_data.username,
          email: data && initial_data.email,
          role: data && initial_data.role
        }
     
      }));
    }
    
  }, [initial_data]);  
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);
    const fullname = errors.fullname && errors.fullname.error;
    const username = errors.fullname && errors.username.error;
    const password = errors.password && errors.password.error;
    const email = errors.email && errors.email.error;
    const role = errors.role && errors.role.error;
    if(mode === "Add") {
      setFormState(formState => ({
        ...formState,
        isValid: fullname || username || password || email || role || emailExist ?  false: true,
        errors: errors || {}
      }));
    } else {
      setFormState(formState => ({
        ...formState,
        isValid: errors.fullname.error || errors.username.error || errors.email.error || errors.role.error ?  false: true,
        errors: errors || {}
      }));
    }
   
  }, [formState.values, emailExist, mode]);

   
const handleChange = event => {
    event.persist(); 
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
    if(event.target.name === "email") {
      const data = event.target.value;
      confirmEmail(data);
    }
  };
  const resetForm = e => {
    setFormState(formState => ({
      ...formState,
      values: {
        id: '',
        fullname: '',
        username: '',
        email: '',
        password: '',
        role: ''
      },
      touched: {
        ...formState.touched,
        name: false, 
      fullname: false,
      username: false,
      email: false,
      password: false,
      role: false
      }
    }));
    
    // handleMode('Add');
    setSending(false);
  }
   
const hasError = field => 
      formState.touched[field] && formState.errors[field].error;  
  
  
 
const addStaff = e => {
    e.preventDefault();
    setSending(true);
    setMessage(''); 
    try {    
            backend.post('staff', formState.values).then(res => { 
              if(res.status === 200) {
               fetchUsers();
               setMessage(res.message);
              //  Toast(true, res.message);
                handleClose();
              } else {
                setSending(false);
              }
              
            })  
          } catch(err) {
            if(err.response.status === 500) {
              console.log("There was a problem with the server");
            } else {
              console.log(err.response.data.msg)
            }
          } 
}

const updateStaff = e => {
  e.preventDefault();  
  setSending(true);
  setMessage(''); 
try {  
  backend.post('staff/update', formState.values).then(res => {
    if(res.status === 200) {
      fetchUsers();
       setSending(false);
       setMessage(res.message);
      //  Toast(true, res.message);
        handleClose();
    } else { 
      setMessage(res.message);
    }
})  
} catch(err) {
        if(err.response.status === 500) { 
          console.log("There was a problem with the server");
        } else { 
          console.log(err.response.data.msg)
        }
      } 
}

var ds = false;
if (sending === true) { 
 ds = true;
}

  return (
    <Fragment>
        <Modal isOpen={open} toggle={handleClose}>
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">
      User Form
      </h5>
      <button
        type="button"
        className="close"
        data-dismiss="modal"
        aria-hidden="true"
        onClick={handleClose}
      >
        <i className="tim-icons icon-simple-remove" />
      </button>
    </div>
      <form noValidate autoComplete="off"  onSubmit={mode === 'Add'? addStaff : updateStaff}>
      
    <ModalBody>
    <Card>
      <CardBody>
        
      <FormGroup  className={
            hasError('fullname') ? 'has-danger' : null} >
            <Label for="fullname">Full Name</Label>
            <Input
              type="text" 
              value={formState.values.fullname || ''}
              name="fullname"
              id="fullname"
              onChange={handleChange} 
              placeholder="Full Name"
            />
          </FormGroup> 

          <FormGroup  className={
           hasError('username') ? 'has-danger' : null} >
            <Label for="username">Username</Label>
            <Input
              type="text" 
              value={formState.values.username || ''}
              name="username"
              id="username"
              onChange={handleChange} 
              placeholder="Username"
            />
          </FormGroup> 
          {mode === "Add" ?
          <FormGroup  className={
            hasError('password') ? 'has-danger' : null} >
            <Label for="password">Password</Label>
            <Input
              type="text" 
              value={formState.values.password || ''}
              name="password"
              id="password"
              onChange={handleChange} 
              placeholder="Password"
            />
             </FormGroup>
            : null
          }
          
          <FormGroup  className={
            hasError('email') ? 'has-danger' : null} >
            <Label for="email">Email</Label>
            <Input
              type="text" 
              disabled={mode === "Add" ? false: true}
              value={formState.values.email || ''}
              name="email"
              id="email"
              onChange={handleChange} 
              placeholder="Email"
            />
          </FormGroup> 
            
          <FormGroup  className={
            hasError('role') ? 'has-danger' : null} >
            <Label for="role">Role</Label>
            <Input
              type="select" 
              value={formState.values.role || ''}
              name="role"
              id="role"
              onChange={handleChange}>
                <option value="">select</option>
                {roles && roles.map(role => (
                  <option value={role.id} key={role.id}>{role.name}</option>
                ))}
              </Input>
          </FormGroup> 
      
      </CardBody>
    </Card> 
    </ModalBody>
    <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button color="primary" disabled={!formState.isValid || ds} 
          type="submit" 
          onClick={mode === 'Add'? addStaff : updateStaff}>
            Save {mode === 'Add'? '' : 'changes'}
        </Button>
    </ModalFooter>
      </form>
</Modal> 
              
    </Fragment>
  )
}

export default observer(AddStaff);

