import React, {Fragment, useEffect, useLayoutEffect, useContext, useState} from 'react'; 
import{ Button, Card, CardBody, FormGroup, Input,  Modal, ModalBody, ModalFooter, Label, FormText } from 'reactstrap'; 
import dataHero from 'data-hero'; 
import { observer } from "mobx-react"  
import { backend } from '../../../Config';
import CategoryStore from '../../../stores/CategoryStore'; 
 
const schema = {
  name:  {
    isEmpty: false,
    min: 6,
    message: 'A valid category name is required'
  },
  description: {
    max: 100,
    message: 'description is required'
  }
};  

const AddCategory = ({ handleClose, open, mode, initial_data }) => {  
  const categoryStore = useContext(CategoryStore);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false); 
  const { fetchCategory } = categoryStore; 
  // mode == 'Add'? "" : initial_data.name
  const [formState, setFormState] = useState({
    isValid: false, 
    values: {
      id: '',
      name: '',
      description: ''
    },
    touched: {},
    errors: {}
  });
  useLayoutEffect(() => { 
    const data = initial_data && initial_data; 
    // console.log('data', data)
    if(data) {
      setFormState(state => ({
        ...state,
        values: {
          id: data.id,
          name: data.name,
          description: data.description
        }
      }));
    }
  }, [initial_data]); 
 
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);

    setFormState(formState => ({
      ...formState,
      isValid: errors.name.error || errors.description.error ?  false: true,
      errors: errors || {}
    }));
  }, [formState.values]);

   
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
  };
  const resetForm = e => {
    setFormState(formState => ({
      ...formState,
      values: {
        id: '',
        name: '',
        description: ''
      },
      touched: {
        ...formState.touched,
        name: false,
        description: false
      }
    }));
     
    setSending(false);
  }
   
const hasError = field =>
      formState.touched[field] && formState.errors[field].error;  
  
 
const addCategory = e => {
    e.preventDefault();  
    setSending(true);
    setMessage(''); 
    try {    
            backend.post('category', formState.values).then(res => { 
              if(res.status === 200) {
               fetchCategory();
               setMessage(res.message);
               resetForm();
               handleClose()
              //  Toast(true, 'success', res.message);
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

const updateCategory = e => {
  e.preventDefault();   
  setSending(true);
  setMessage(''); 
try {  
  backend.post('category/update', formState.values).then(res => {
    if(res.status === 200) {
      fetchCategory(); 
       setMessage(res.message);
       handleClose();
      //  Toast(true, 'success', res.message); 
    } else { 
      setMessage(res.message);
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

var ds = false;
if (sending === true) { 
 ds = true;
}
 
  return (
    <Fragment>
      
      <Modal isOpen={open} toggle={handleClose}>
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">
      Category Form
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
      <form noValidate autoComplete="off"  onSubmit={mode === 'Add'? addCategory : updateCategory}>
      
    <ModalBody>
    <Card>
      <CardBody>      
        
      <FormGroup  className={
            hasError('name') ? 'has-danger' : null} >
            <Label for="catName">Category Name</Label>
            <Input
              type="text" 
              value={formState.values.name || ''}
              name="name"
              id="catName"
              onChange={handleChange}
              placeholder="Category Name"
            />
            <FormText>
        <p className="text-danger">{  hasError('name') ? formState.errors.name && formState.errors.name.message : null } </p>
            </FormText>
          </FormGroup>

          <FormGroup className={
            hasError('description') ? 'has-danger' : null} >
            <Label for="description">Description</Label>
            <Input
             type="textarea"
             onChange={handleChange}
             name="description"
             id="description"
             value={formState.values.description || ''}
              />
               <FormText>
        <p className="text-danger">{  hasError('description') ? formState.errors.description && formState.errors.description.message : null } </p>
            </FormText>
          </FormGroup>
          
      </CardBody>
    </Card> 
    </ModalBody>
    <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button color="primary" disabled={!formState.isValid || sending} 
          type="submit" 
          onClick={mode === 'Add'? addCategory : updateCategory}>
            Save changes
        </Button>
    </ModalFooter>
      </form>
</Modal>
   </Fragment>  

       )
}

export default observer(AddCategory);

  