import React, {  useContext, useState } from 'react';
import { Row, Col } from 'reactstrap';

import { observer } from "mobx-react"  
import Helmet from 'react-helmet';
import ProductStore from '../../stores/ProductStore';
import { ProductList } from './components';

  
const Product = () => { 
  const productStore = useContext(ProductStore); 
  const {  filteredProduct, loading, toggleProduct } = productStore;  
  const [mode, setMode] = useState('Add');
  const [data, setData] = useState([]);

const handleMode = (value) => {
  setMode(value);
}
const handleData = (value) => {
  setData(value);
}
const handleSwitch = (elem, state, id) => { 
const data = {
  id,
  status: state === "Active" ? "Pending" : "Active"
} 
   toggleProduct(data);
 } 
  return (
    <div className="content">
    <Helmet>
            <title>Product Management</title>
            <meta name="description" content="Product Management" />
      </Helmet>
     <Row>
     <Col xs="12" md="12"> <h3 className="title"> Product Management</h3> </Col>
    {/* <Col xs="12" md="4">
    <AddCategory handleMode={handleMode} mode={mode} initial_data={data} />
    </Col> */}
    <Col xs="12" md="12"> 
        <ProductList loading={loading} products={filteredProduct} toggle={handleSwitch} handleData={handleData} />
    </Col>
    </Row> 
    </div>
  );
};

export default observer(Product);

