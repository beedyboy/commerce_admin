import React, {  useContext, useState } from 'react'; 
import { observer } from "mobx-react" 
import { CategoryTable, CategoryToolbar } from './components'; 
import { Row, Col } from 'reactstrap';
import CategoryStore from '../../stores/CategoryStore'; 
import Helmet from 'react-helmet';

  
const Category = () => { 
  const categoryStore = useContext(CategoryStore); 
  const {  filteredCategory } = categoryStore;  
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
         <Helmet>
            <title>Category</title>
            <meta name="description" content="Category" />
      </Helmet>
    <Row>
      <Col xs="12" md="12"><CategoryToolbar /></Col>
     
      <Col xs="12" md="12"><CategoryTable categories={filteredCategory} /></Col>
    </Row>
  </div>
    // <div className="content">
    //  <Row>
    //  <Col xs="12" md="12"> <h3 className="title"> Category Management</h3> </Col>
    // <Col xs="12" md="4">
    // <AddCategory handleMode={handleMode} mode={mode} initial_data={data} />
    // </Col>
    // <Col xs="12" md="8"> 
    //     <ListCategory categories={filteredCategory} handleMode={handleMode} handleData={handleData} />
    // </Col>
    // </Row> 
    // </div>
  );
};

export default observer(Category);

