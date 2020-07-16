import React, {Fragment, useEffect, useLayoutEffect, useContext, useState} from 'react';
import { observer } from "mobx-react"
import{ Button, Card, CardBody, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, Row, Col } from 'reactstrap'; 
import dataHero from 'data-hero'; 
import { backend } from '../../../Config';
import RoleStore from '../../../stores/RoleStore';
   

const AddRole = ({ handleClose, open, mode, initial_data}) => { 
  const [name, setName] = useState('');
  const roleStore = useContext(RoleStore);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [hasError, setHasError]  = useState(false);
  const { fetchRoles } = roleStore; 
  
  
  const [formState, setFormState] = useState({
    isValid: false, 
    touched: {},
    errors: {}
  });
  
  
  const [priviledges, setPriviledges] = useState({ 
    roles: { add: true, view: false, del: true}, 
    categories: { add: false, view: false, del: false}, 
    staffs: { add: false, view: false, del: false}, 
    buyers: { add: false, view: false, del: false}, 
    shops: { add: false, view: false, del: false}, 
    products: { add: false, view: false, del: false}
  });
 
  // let shouldSetPriviledges =  initial_data && (initial_data.name || initial_data.priviledges);
  useLayoutEffect(() => {  
  let shouldSetPriviledges =  typeof initial_data !== 'undefined' ? true : false;
  // console.log("shouldSetPriviledges", shouldSetPriviledges);
    if (shouldSetPriviledges) { 
    const d = initial_data && initial_data.name;
    const data = initial_data && initial_data.priviledges;
    setName(d || '');
    setPriviledges(state => ({
      ...state,
    roles: { 
        add: data && data.roles.add,
        view: data && data.roles.view, 
        del: data && data.roles.del
      },
     categories: { 
        add: data && data.categories.add,
        view: data && data.categories.view, 
        del: data && data.categories.del
      },
      staffs: { 
        add: data && data.staffs.add,
        view: data && data.staffs.view, 
        del: data && data.staffs.del
      },
      buyers: { 
        add: data && data.buyers.add,
        view: data && data.buyers.view, 
        del: data && data.buyers.del
      },
      shops: { 
        add: data && data.shops.add,
        view: data && data.shops.view, 
        del: data && data.shops.del
      },
      products: { 
        add: data && data.products.add,
        view: data && data.products.view, 
        del: data && data.products.del
      },
   
    })); 
    }
  }, [initial_data]); 
  useEffect(() => {
    // console.log('roles', priviledges.roles)
    // const errors = dataHero.validate(schema, name);
    const error = dataHero.validator(name, 'min', 2);
    setHasError(error); 
    setFormState(formState => ({
      ...formState,
      isValid: !error,
      errors: error?  'Name field must be a minimum of 2 characters': null
    })); 
  }, [priviledges, name]);

  const handleRoleChange = (event, role) => { 
    event.persist(); 
    setPriviledges(formState => ({
      ...formState,
      [role]: {
        ...formState[role],
        [event.target.name]:  event.target.checked
      } 
    }));
      
    
  };

const handleChange = event => {
    event.persist(); 
    
    setName(event.target.value); 
    };
   
    
  
 
const addRole = e => {
    e.preventDefault();  
    const data = {
      name,
      priviledges,
      id: mode === 'Add'? "" : initial_data.id
    } 
    setSending(true);
    setMessage(''); 
    try {    
            backend.post('role', data).then(res => { 
              if(res.status === 200) {
               fetchRoles();
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

const updateRole = e => {
  e.preventDefault();  
  const data = {
    name,
    priviledges,
    id: mode === 'Add'? "" : initial_data.id
  }
  // mode == 'Add'? addRole(data) : updateRole(data);
  setSending(true);
  setMessage(''); 
try {  
  backend.post('role/update', data).then(res => {
    if(res.status === 200) {
      fetchRoles();
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
      Role Form
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
      <form noValidate autoComplete="off"  onSubmit={mode === 'Add'? addRole : updateRole}>
      
    <ModalBody>
    <Card>
      <CardBody>
        
      <FormGroup  className={
            hasError ? 'has-danger' : null} >
            <Label for="catName">Role Name</Label>
            <Input
              type="text" 
              value={name || ''}
              name="name"
              id="catName"
              onChange={handleChange} 
              placeholder="Role Name"
            />
          </FormGroup>
          <h4 className="title"> Assign responsibility </h4>
        <Row>
          <Col md="12">
            
           <Label>Role:</Label>
           <br />
             <FormGroup check inline> 
                <Label className="form-check-label">
                    <Input className="form-check-input" type="checkbox" checked={priviledges.roles.add || false } name="add" onChange={(event)=> handleRoleChange(event, 'roles')}/>
                    Add
                    <span className="form-check-sign">
                      <span className="check"></span>
                    </span>
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label className="form-check-label">
                    <Input className="form-check-input" type="checkbox" checked={priviledges.roles.view || false } name="view" onChange={(event)=> handleRoleChange(event, 'roles')}/>
                    View
                    <span className="form-check-sign">
                      <span className="check"></span>
                    </span>
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label className="form-check-label">
                    <Input className="form-check-input" type="checkbox" checked={priviledges.roles.del || false } name="del" onChange={(event)=> handleRoleChange(event, 'roles')}/>
                    Del
                    <span className="form-check-sign">
                      <span className="check"></span>
                    </span>
                </Label>
              </FormGroup>
      
          </Col>

          <Col md="12">
          <Label>Category:</Label> <br />
          <FormGroup check inline>  
                <Label className="form-check-label">
                    <Input className="form-check-input" type="checkbox" checked={priviledges.categories.add || false } name="add" onChange={(event)=> handleRoleChange(event, 'categories')}/>
                    Add
                    <span className="form-check-sign">
                      <span className="check"></span>
                    </span>
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label className="form-check-label">
                    <Input className="form-check-input" type="checkbox" checked={priviledges.categories.view || false } name="view" onChange={(event)=> handleRoleChange(event, 'categories')}/>
                    View
                    <span className="form-check-sign">
                      <span className="check"></span>
                    </span>
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label className="form-check-label">
                    <Input className="form-check-input" type="checkbox" checked={priviledges.categories.del || false } name="del" onChange={(event)=> handleRoleChange(event, 'categories')}/>
                    Del
                    <span className="form-check-sign">
                      <span className="check"></span>
                    </span>
                </Label>
              </FormGroup>
      
          </Col>
        
          <Col md="12">
          <Label>Buyers:</Label> <br />
          <FormGroup check inline>  
                <Label className="form-check-label">
                    <Input className="form-check-input" type="checkbox" checked={priviledges.buyers.add || false } name="add" onChange={(event)=> handleRoleChange(event, 'buyers')}/>
                    Add
                    <span className="form-check-sign">
                      <span className="check"></span>
                    </span>
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label className="form-check-label">
                    <Input className="form-check-input" type="checkbox" checked={priviledges.buyers.view || false } name="view" onChange={(event)=> handleRoleChange(event, 'buyers')}/>
                    View
                    <span className="form-check-sign">
                      <span className="check"></span>
                    </span>
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label className="form-check-label">
                    <Input className="form-check-input" type="checkbox" checked={priviledges.buyers.del || false } name="del" onChange={(event)=> handleRoleChange(event, 'buyers')}/>
                    Del
                    <span className="form-check-sign">
                      <span className="check"></span>
                    </span>
                </Label>
              </FormGroup>
      
          </Col>
        
          <Col md="12">
          <Label>Products</Label> <br />
          <FormGroup check inline>  
                <Label className="form-check-label">
                    <Input className="form-check-input" type="checkbox" checked={priviledges.products.add || false } name="add" onChange={(event)=> handleRoleChange(event, 'products')}/>
                    Add
                    <span className="form-check-sign">
                      <span className="check"></span>
                    </span>
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label className="form-check-label">
                    <Input className="form-check-input" type="checkbox" checked={priviledges.products.view || false } name="view" onChange={(event)=> handleRoleChange(event, 'products')}/>
                    View
                    <span className="form-check-sign">
                      <span className="check"></span>
                    </span>
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label className="form-check-label">
                    <Input className="form-check-input" type="checkbox" checked={priviledges.products.del || false } name="del" onChange={(event)=> handleRoleChange(event, 'products')}/>
                    Del
                    <span className="form-check-sign">
                      <span className="check"></span>
                    </span>
                </Label>
              </FormGroup>
      
          </Col>
           
          <Col md="12">
          <Label>Shop</Label> <br />
          <FormGroup check inline>  
                <Label className="form-check-label">
                    <Input className="form-check-input" type="checkbox" checked={priviledges.shops.add || false } name="add" onChange={(event)=> handleRoleChange(event, 'shops')}/>
                    Add
                    <span className="form-check-sign">
                      <span className="check"></span>
                    </span>
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label className="form-check-label">
                    <Input className="form-check-input" type="checkbox" checked={priviledges.shops.view || false } name="view" onChange={(event)=> handleRoleChange(event, 'shops')}/>
                    View
                    <span className="form-check-sign">
                      <span className="check"></span>
                    </span>
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label className="form-check-label">
                    <Input className="form-check-input" type="checkbox" checked={priviledges.shops.del || false } name="del" onChange={(event)=> handleRoleChange(event, 'shops')}/>
                    Del
                    <span className="form-check-sign">
                      <span className="check"></span>
                    </span>
                </Label>
              </FormGroup>
      
          </Col>
       
        </Row>   
       
      </CardBody>
    </Card> 
    </ModalBody>
    <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button color="primary" disabled={!formState.isValid || ds} 
          type="submit" 
          onClick={mode === 'Add'? addRole : updateRole}>
            Save changes
        </Button>
    </ModalFooter>
      </form>
</Modal>
          
         

         
    
              {/* <TextField
                  className={classes.textField}
                  error={hasError}
                  fullWidth
                  helperText={
                    formState.errors
                  }
                  label="Role Name"
                  name="name"
                  onChange={handleChange}
                  type="text"
                  value={name || ''}
                  variant="outlined"
                /> */}
              
    </Fragment >
  )
}

export default observer(AddRole);

