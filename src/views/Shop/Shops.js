import React, {  useContext } from 'react'; 
import { observer } from "mobx-react"  
import { Row, Col } from 'reactstrap';  
import { ListShop } from './components';
import ShopStore from '../../stores/ShopStore';
import Helmet from 'react-helmet';

  
const Shop = () => { 
  const shopStore = useContext(ShopStore); 
  const { filteredShop } = shopStore;  
  // const [mode, setMode] = useState('Add');
//   const [data, setData] = useState([]);

// const handleMode = (value) => {
//   setMode(value);
// }
// const handleData = (value) => {
//   setData(value);
// }
  return (
    <div className="content">
        <Helmet>
            <title>Shops</title>
            <meta name="description" content="Shops" />
      </Helmet>
     <Row>
     <Col xs="12" md="12"> <h3 className="title"> Shop Management</h3> </Col>
    
    <Col xs="12" md="12"> 
        <ListShop shops={filteredShop} />
    </Col>
    </Row> 
    </div>
  );
};

export default observer(Shop);

