import React, {  useContext, useState } from 'react'; 
import { observer } from "mobx-react"  
import { Row, Col } from 'reactstrap'; 
import MemberStore from '../../stores/MemberStore';
import { ListMember } from './components';
import Helmet from 'react-helmet';

  
const Members = () => { 
  const memberStore = useContext(MemberStore); 
  const { filteredMember } = memberStore;  
  const [mode, setMode] = useState('Add');
  const [data, setData] = useState([]);

const handleMode = (value) => {
  setMode(value);
}
const handleData = (value) => {
  setData(value);
}
// console.log('filteredMember', filteredMember);
  return (
    <div className="content">
         <Helmet>
            <title>Members</title>
            <meta name="description" content="Dashboard" />
      </Helmet>
     <Row>
     <Col xs="12" md="12"> <h3 className="title"> Members Management</h3> </Col>
    
    <Col xs="12" md="12"> 
        <ListMember members={filteredMember} handleMode={handleMode} handleData={handleData} />
    </Col>
    </Row> 
    </div>
  );
};

export default observer(Members);

