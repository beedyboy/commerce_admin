import React, {  useContext, useState, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,  FormFeedback, Row,
} from 'reactstrap'; 
import './SignIn.css';
import dataHero from 'data-hero';
import PropTypes from 'prop-types'; 
import { observer } from 'mobx-react';
import UserStore from '../../stores/UserStore';
import { useAlert } from 'react-alert';
import Helmet from 'react-helmet';

const schema = {
    user:  {
      isEmpty: false,
      min: 6,
      message: 'A valid user is required'
    },
    password: {
      min: 6,
      message: 'password is required'
    }
  };

const SignIn = props =>  {
    const { history } = props;
    const alert = useAlert();
    const userStore = useContext(UserStore);
    const { login, isAuthenticated, loginSuccessful, loading, error: storeError } = userStore; 
  
    const [formState, setFormState] = useState({
      isValid: false,
      values: {
        user: '',
        password: ''
      },
      touched: {},
      errors: {}
    });
  
    useEffect(() => {
      const errors = dataHero.validate(schema, formState.values);
  
      setFormState(formState => ({
        ...formState,
        isValid: errors.user.error || errors.password.error ?  false: true,
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
  
    // const handleSignIn = event => {
    //   event.preventDefault();
    //   history.push('/');
    // };
    const handleSignIn = event => {
      event.preventDefault();
      login(formState.values);
      // isAuthenticated === true ? history.push('/'): null;
    };
    const { from } = props.location.state || { from: { pathname: '/dashboard' } }
    if (isAuthenticated === true) {
      alert.success('Login successful!');
      loginSuccessful();
      return (
        <Redirect to={from} />
      )
    }
    const hasError = field =>
          formState.touched[field] && formState.errors[field].error; 
      // formState.touched[field] && formState.errors[field] ? true : false;
  
    return (
      <Fragment>
           <Helmet>
            <title>Login Page</title>
            <meta name="description" content="Login Page" />
      </Helmet>
      <Container className="SignIn">
        <Row>
          <Col sm={{size: 8, offset: 2}} md={{ size: 8, offset: 2}}>
            
          <h2>Sign In</h2>
        <Form className="form" onSubmit={(event) => handleSignIn(event) }>
          <Col>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="text"
                name="user"
                id="exampleEmail" 
                value={ formState.values.user || '' }
                // valid={ !hasError('user')  }
                invalid={ hasError('user') }
                onChange={handleChange }
              />
              <FormFeedback invalid>
              {
                    hasError('user') ? formState.errors.user && formState.errors.user.message : null
                  } 
              </FormFeedback>
              {/* <FormFeedback valid>
                Uh oh! Looks like there is an issue with your email. Please input a correct email.
              </FormFeedback>
              <FormText>Your username is most likely your email.</FormText> */}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
                value={ formState.values.password || '' }
                invalid={ hasError('password') }
                onChange={handleChange}
            /> 
            <FormFeedback invalid>
            {
                  hasError('password') ? formState.errors.password && formState.errors.password.message : null
                } 
            </FormFeedback>
            </FormGroup>
          </Col>
          <Col><Button color="primary" disabled={!formState.isValid}> Sign in now</Button></Col>
      </Form>
      
      </Col>
        </Row>
        </Container>
    </Fragment>
    );
  }
  SignIn.propTypes = {
    history: PropTypes.object
  };

  export default  observer(SignIn);