import React, {Fragment, useEffect, useLayoutEffect, useContext, useState} from 'react'; 
import{ Button, Card, CardBody, CardHeader, FormGroup, Input, Label, FormText } from 'reactstrap'; 
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

const AddMember = ({ mode, handleMode, initial_data}) => {  
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
    setFormState(state => ({
      ...state,
      values: {
        id: data.id,
        name: data.name,
        description: data.description
      },
       
   
    }));
    
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
    
    handleMode('Add');
    setSending(false);
  }
   
const hasError = field =>
      formState.touched[field] && formState.errors[field].error;  
  
 
const addCategory = e => {
    e.preventDefault();  
      // id: mode === 'Add'? "" : initial_data.id
    
    setSending(true);
    setMessage(''); 
    try {    
            backend.post('category', formState.values).then(res => { 
              if(res.status === 200) {
               fetchCategory();
               setMessage(res.message);
               resetForm();
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
   
  // mode == 'Add'? addCategory(data) : updateCategory(data);
  setSending(true);
  setMessage(''); 
try {  
  backend.post('category/update', formState.values).then(res => {
    if(res.status === 200) {
      fetchCategory(); 
       setMessage(res.message);
      //  Toast(true, 'success', res.message);
        resetForm();
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
      <div className="content">
       <Card>
        <CardHeader>
          <h5 className="title">Category Form</h5>
        </CardHeader> 
       <CardBody>
       <form noValidate autoComplete="off" onSubmit={mode === 'Add'? addCategory : updateCategory}> 
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
          <Button color="default" onClick={resetForm}>Reset</Button>
          <Button color="primary" disabled={!formState.isValid || sending}>
            Save 
        </Button>
      </form>
      </CardBody>
    </Card> 
    </div>
   </Fragment>  

       )
}

export default observer(AddMember);

 {/* <TextField
          className={classes.textField}          
          error={hasError('name')}
          fullWidth
          
          
          type="text"
          
          variant="outlined"
        />        

      </Grid> 

      <Grid
      item
      md={12}
      xs={12}>
       <TextField
          className={classes.textField}
          error={hasError('description')}
          fullWidth
          helperText={
            hasError('description') ? formState.errors.description && formState.errors.description.message : null
          }
          label="Description"
          name="description"
          type="text"
          multiline
          rows={3}
          rowsMax={5}
          value={formState.values.description || ''}
          variant="outlined"
        />        
 */}