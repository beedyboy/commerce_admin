import React, { Fragment, useContext, useState } from 'react'; 
import PropTypes from 'prop-types';
import { observer } from "mobx-react" 
import { Button, Table, Badge } from 'reactstrap';
import { TablePagination } from '../../../shared/TablePagination';
import MemberStore from '../../../stores/MemberStore'; 

const SellersList = props => {
  const { className, sellers, filter, handleData, handleMode } = props; 
  const memStore = useContext(MemberStore); 
  const {  removeSeller, setFilter } = memStore;  

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
    // removeSeller(id);
    //  console.log('you wanna delete', id);
  };  

  const handleFilter = (data) => {
    setFilter(data);
  }
//Get current module
const indexOfLastPosts = currentPage * rowsPerPage;
const indexOfFirstPosts = indexOfLastPosts - rowsPerPage;
const currentPosts = sellers.slice(indexOfFirstPosts, indexOfLastPosts); 

  return (
    <Fragment> 
      <Table responsive>
    <thead>
        <tr>
            {/* <th className="text-center">#</th> */}
            <th>Shop Name</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Status</th>
            <th className="text-center">Created at</th> 
            <th className="text-right">Actions</th>
        </tr>
    </thead>
    <tbody>
    {currentPosts.slice(0, rowsPerPage).map(( mem, i) => (
    <tr key={mem.id} >
            {/* <td className="text-center">{i + 1}</td> */}
            <td> {mem.shop_name || 'Not available'} </td>
            <td> {mem.firstname || 'Not available'} </td>
            <td> {mem.lastname || 'Not available'} </td>
            <td> {mem.email} </td> 
            <td>
            <Badge color={mem.status === 'Pending' ? 'danger' : 'success'} pill>
                {mem.status}</Badge>
             </td>
            <td className="text-right">{mem.created_at}</td>
            <td className="text-right">
                
                <Button onClick={() => editRow(mem) } className="  btn-simple" color="success" size="sm">
                   Edit
                </Button>{` `}
                <Button className="  btn-simple" onClick={()=> removeRow(mem.id)} color="danger" size="sm">
                  Delete
                </Button>{` `}
            </td>
        </tr>
         ))}
    </tbody>
</Table>
<nav>
  <TablePagination pagesCount={sellers.length} postsPerPage={rowsPerPage}  currentPage={currentPage}
   paginate={handlePaginate} handlePreviousClick={handlePreviousClick} handleNextClick={handleNextClick}
    />
</nav>
 
    </Fragment>
    );
};

SellersList.propTypes = {
  className: PropTypes.string,
  sellers: PropTypes.array.isRequired
};

export default observer(SellersList);
