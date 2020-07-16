import React, {  useContext, useState } from 'react'; 
import { observer } from "mobx-react"  
import ProductStore from '../../stores/ProductStore';
import { ProductCard } from './components';

  
const Category = () => { 
  const productStore = useContext(ProductStore); 
  const {  filteredProduct, loading } = productStore;  
  const [mode, setMode] = useState('Add');
  const [data, setData] = useState([]);

const handleMode = (value) => {
  setMode(value);
}
const handleData = (value) => {
  setData(value);
}
  return (
    <div className="content">
     <Row>
     <Col xs="12" md="12"> <h3 className="title"> Product Management</h3> </Col>
    {/* <Col xs="12" md="4">
    <AddCategory handleMode={handleMode} mode={mode} initial_data={data} />
    </Col> */}
    <Col xs="12" md="8"> 
        <ProductCard loading={loading} products={filteredProduct} handleMode={handleMode} handleData={handleData} />
    </Col>
    </Row> 
    </div>
  );
};

export default observer(Category);

