import React, { Fragment } from 'react'; 
import PropTypes from 'prop-types';   
import { Row, Col, Button, Badge } from 'reactstrap'; 
import AddCategory from '../AddCategory';
 
 
const CategoryToolbar = props => {
  const { className,  ...rest } = props;
 

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => { 
    setOpen(false);
  };
  return (
    <Fragment>  
       <AddCategory open={open} mode="Add" handleClose={handleClose} />
     
       <div className="content">
           <Row>
           <Col sm="12" md={{ size: '5'  }}>
            <Badge color="default">
            <Button size="sm" color="secondary">Excel</Button>
            <Button size="sm" color="secondary">  PDF </Button>
            <Button size="sm" color="secondary"> Print</Button>
            </Badge>
              
        </Col>
            <Col sm="12" md={{ size: '3', offset: 4 }}>
              <Button size="md"
          color="primary" 
          onClick={handleClickOpen}
        >
         Create Category
        </Button> 
        </Col>
    
       </Row>
       </div> 
      {/* <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search role"
        />
      </div> */} 
    </Fragment>
   );
};

CategoryToolbar.propTypes = {
  className: PropTypes.string
};

export default CategoryToolbar;
