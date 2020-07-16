import React, {  useContext } from 'react'; 
import { observer } from "mobx-react" 
import RolesToolbar from './components/RolesToolbar'; 
import RolesTable from './components/RolesTable';
import {  Row, Col } from 'reactstrap';
import RoleStore from '../../stores/RoleStore';
import Helmet from 'react-helmet';
   
const RoleList = () => { 
  const roleStore = useContext(RoleStore); 
  const {  info } = roleStore;  

  return (
    <div className="content"> 
      <Helmet>
    <title>Roles Management</title>
    <meta name="description" content="Roles Management" />
</Helmet>
      <Row>
        <Col xs="12" md="12"><RolesToolbar /></Col>
       
        <Col xs="12" md="12"><RolesTable roles={info} /></Col>
      </Row>
    </div>
    
  );
};

export default observer(RoleList);

