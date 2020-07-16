import React, {  useContext } from 'react'; 
import { observer } from "mobx-react" 
import StaffsToolbar from './components/StaffsToolbar'; 
import StaffsTable from './components/StaffsTable';
import {  Row, Col } from 'reactstrap';
import UserStore from '../../stores/UserStore'; 
import Helmet from 'react-helmet';
  
const StaffList = () => { 
  const userStore = useContext(UserStore); 
  const {  info } = userStore;  
 
  return (
    <div className="content">
         <Helmet>
            <title>Staff Management</title>
            <meta name="description" content="Staff Management" />
      </Helmet>
      <Row>
        <Col xs="12" md="12"><StaffsToolbar/></Col>
       
        <Col xs="12" md="12"><StaffsTable users={info} /></Col>
      </Row>
    </div>
    
  );
};

export default observer(StaffList);

