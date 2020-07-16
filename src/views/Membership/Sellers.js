import React, {  useContext, useState, useEffect } from 'react'; 
import { observer } from "mobx-react"  
import { Row, Col } from 'reactstrap'; 
import MemberStore from '../../stores/MemberStore';
import Helmet from 'react-helmet';
import SellersList from './components/SellersList';

const Sellers = () => {
   
  const memberStore = useContext(MemberStore); 
  const { filteredSeller, allSellers } = memberStore;  
  const [mode, setMode] = useState('Add');
  const [data, setData] = useState([]);

 useEffect(() => {
    allSellers(); 
}, []);

const handleMode = (value) => {
  setMode(value);
}
const handleData = (value) => {
  setData(value);
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
        <SellersList sellers={filteredSeller} handleMode={handleMode} handleData={handleData} />
    </Col>
    </Row> 
    </div>
  );
};

export default observer(Sellers);
