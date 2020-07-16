import React, { Fragment, useContext, useState } from 'react'; 
import PropTypes from 'prop-types';
import { observer } from "mobx-react" 
import { Button, Table } from 'reactstrap';
import { TablePagination } from '../../../shared/TablePagination'; 
import ShopStore from '../../../stores/ShopStore';



const ListShop = props => {
  const { shops } = props; 
  const shopStore = useContext(ShopStore); 
  const {  setFilter } = shopStore;  

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);  
  
   
 
  const handlePaginate = (event, page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };
  const handleNextClick = () => {
    let d = currentPage + 1;
    setCurrentPage(d);
  }
  
const handlePreviousClick = () => {
  let d = currentPage - 1;
  setCurrentPage(d);
}
  const editRow = ( data) => {  
    // console.log('data', data);
    // handleMode('Edit');
    // handleData(data);  
  };
   
  const removeRow = (id) => { 
    // removeListShop(id);
    //  console.log('you wanna delete', id);
  };  

  const handleFilter = (data) => {
    setFilter(data);
  }
//Get current module
const indexOfLastPosts = currentPage * rowsPerPage;
const indexOfFirstPosts = indexOfLastPosts - rowsPerPage;
const currentPosts = shops.slice(indexOfFirstPosts, indexOfLastPosts);
// const noOfPages =  Math.ceil(shops.length / rowsPerPage);
    

  return (
    <Fragment> 
      <Table responsive>
    <thead>
        <tr>
            {/* <th className="text-center">#</th> */}
            <th>Name</th>
            <th>Description</th> 
            {/* <th className="text-center">Created at</th>
            <th className="text-right">Updated at</th> */}
            <th className="text-right">Actions</th>
        </tr>
    </thead>
    <tbody>
    {currentPosts.slice(0, rowsPerPage).map(( shop, i) => (
    <tr key={shop.id} >
            {/* <td className="text-center">{i + 1}</td> */}
            <td> {shop.name} </td> 
             <td>{shop.description.length > 15 ? shop.description.slice(0, 15) + ' . . .' : shop.description} </td>
           
            {/* <td className="text-right">{shop.created_at}</td>
            <td>{shop.updated_at}</td> */}
            <td className="text-right">
                
                <Button onClick={() => editRow(shop) } className="  btn-simple" color="success" size="sm">
                    Edit
                </Button>{` `}
                <Button className="btn-simple" onClick={()=> removeRow(shop.id)} color="danger" size="sm">
                  Delete
                </Button>{` `}
            </td>
        </tr>
         ))}
    </tbody>
</Table>
<nav>
  <TablePagination pagesCount={shops.length} postsPerPage={rowsPerPage}  currentPage={currentPage}
   paginate={handlePaginate} handlePreviousClick={handlePreviousClick} handleNextClick={handleNextClick}
    />
</nav>
{/*     
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
      <ButtonGroup size="large" variant="contained" color="secondary" aria-label="Filter data">
        <Button 
        color={filter === 'ALL' ? 'primary' : 'inherit'}
        onClick={() => handleFilter('ALL')}
        >All</Button>
        <Button
        onClick={() => handleFilter('Active')}
        color={filter === 'Active' ? 'primary' : 'inherit'}
        >Active</Button>
        <Button
        onClick={() => handleFilter('Inactive')}
        color={filter === 'Inactive' ? 'primary' : 'inherit'}
        >Inactive</Button>
      </ButtonGroup>
      
      <CardActions className={classes.actions}>
        <TablePagination 
         
          onChangeRowsPerPage={handleRowsPerPageChange}
         
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card> */}
    </Fragment>
    );
};

ListShop.propTypes = { 
  shops: PropTypes.array.isRequired
};

export default observer(ListShop);
