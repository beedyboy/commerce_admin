import React, {  useContext, useEffect } from 'react'; 
import { observer } from "mobx-react"  
import { Row, Col } from 'reactstrap'; 
import MemberStore from '../../stores/MemberStore';
import Helmet from 'react-helmet';
import SellersList from './components/SellersList';

const Sellers = () => {
   
  const memberStore = useContext(MemberStore); 
  const { filteredSeller, allSellers, toggleSeller } = memberStore;  

 useEffect(() => {
    allSellers(); 
}, []);
 
const handleSwitch = (elem, state, id) => { 
const data = {
  id,
  status: state === "Active" ? "Pending" : "Active"
} 
   toggleSeller(data);
 } 
  return (
    <div className="content">
         <Helmet>
            <title>Sellers</title>
            <meta name="description" content="Sellers" />
      </Helmet>
     <Row>
     <Col xs="12" md="12"> <h3 className="title"> Sellers</h3> </Col>
    
    <Col xs="12" md="12"> 
        <SellersList sellers={filteredSeller}  toggle={handleSwitch} />
    </Col>
    </Row> 
    </div>
  );
};

export default observer(Sellers);
