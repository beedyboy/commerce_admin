import React, {  useContext, useState, useEffect } from 'react'; 
import { observer } from "mobx-react"  
import { Row, Col } from 'reactstrap'; 
import MemberStore from '../../stores/MemberStore';
import Helmet from 'react-helmet';
import BuyersList from './components/BuyersList';
import { toJS } from 'mobx';

const Buyers = () => {
   
  const memberStore = useContext(MemberStore); 
  const { filteredBuyer, allBuyers } = memberStore;  
  const [mode, setMode] = useState('Add');
  const [data, setData] = useState([]);

 useEffect(() => {
    allBuyers(); 
}, []);

const handleMode = (value) => {
  setMode(value);
}
const handleData = (value) => {
  setData(value);
} 
// console.log(toJS(filteredBuyer)); 
  return (
    <div className="content">
         <Helmet>
            <title>Buyers</title>
            <meta name="description" content="Buyers" />
      </Helmet>
     <Row>
     <Col xs="12" md="12"> <h3 className="title"> Buyers</h3> </Col>
    
    <Col xs="12" md="12"> 
        <BuyersList buyers={filteredBuyer} handleMode={handleMode} handleData={handleData} />
    </Col>
    </Row> 
    </div>
  );
};


export default observer(Buyers);
