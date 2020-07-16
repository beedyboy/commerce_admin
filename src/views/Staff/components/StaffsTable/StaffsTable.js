import React, { Fragment, useContext, useState } from 'react'; 
import PropTypes from 'prop-types';
import { observer } from "mobx-react" 
import { Card, CardHeader, CardBody, CardTitle, Table,  Row,  Col, Button } from 'reactstrap';  
import UserStore from '../../../../stores/UserStore';
import { TablePagination } from '../../../../shared/TablePagination';
import AddStaff from '../AddStaff';
import Switch  from 'react-bootstrap-switch';
 

const StaffsTable = props => {
  const { className, users,  ...rest } = props; 
  const userStore = useContext(UserStore); 
  const {  removeUser, toggleUser } = userStore;  

  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [rowData, setRowData] = React.useState();  
 
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
  const [page, setPage] = useState(0);  
  
 const handleSwitch = (elem, state, id) => { 
const data = {
  id,
  status: state === true ? "Pending" : "Active"
}
   toggleUser(data);
 }  
 
  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const editRow = ( data) => { 
    setRowData(data); 
    setOpen(true);
  };
  
  const handleClose = () => { 
    setOpen(false);
  };  
  const removeRow = (id) => { 
    removeUser(id);
    //  console.log('you wanna delete', id);
  };  

 
//Get current module
const indexOfLastPosts = currentPage * rowsPerPage;
const indexOfFirstPosts = indexOfLastPosts - rowsPerPage;
const currentPosts = users.slice(indexOfFirstPosts, indexOfLastPosts);
const noOfPages =  Math.ceil(users.length / rowsPerPage);
  
// console.log('currentPosts', currentPosts);
   
  return (
    <Fragment>
     <AddStaff open={open} mode="Edit"  initial_data={rowData} handleClose={handleClose} />
     <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Admin users</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th> FullName </th>
                        <th> Username </th>
                        <th> Email </th>
                        <th> Role </th>
                        <th> Created</th>
                        <th>Updated</th>
                        <th> Status </th>
                        <th className="text-center">Action</th>
                      </tr>
                
                    </thead>
                    <tbody>
                      {currentPosts.slice(0, rowsPerPage).map(user => (
                        <tr key={user.id}>
                        <td>{user.fullname} </td>
                        <td>{user.username} </td>
                        <td>{user.email} </td>
                        <td>{user.roleName} </td>
                        <td>{user.created_at}</td>
                        <td>{user.updated_at}</td>
                        <td>
                          {/* {user.status} */}
                          {/* <Switch  onChange={(el) => handleSwitch(el, user.status)} name='status'  /> */}
                          <Switch 
                        defaultValue={user.status}
                        offColor="default"
                        offText="Pending"
                        onColor="success"
                        onText="Active"
                         onChange={(el) => handleSwitch(el, user.status, user.id)} name='status' />
                         </td>
                        <td className="text-center">
                       
                <Button className="btn-simple" onClick={() => editRow(user) }
                     color="success" size="sm">
                    Edit
                </Button>{` `}
                <Button className="btn-simple" color="danger" 
                       onClick={()=> removeRow(user.id)} size="sm">
                   Delete
                </Button>{` `}
                        </td>
                      </tr>
                            
                ))}
                      
                    </tbody>
                  </Table>
                  <nav>
  <TablePagination pagesCount={users.length} postsPerPage={rowsPerPage}  currentPage={currentPage}
   paginate={handlePaginate} handlePreviousClick={handlePreviousClick} handleNextClick={handleNextClick}
    />
</nav>
                </CardBody>
              </Card>
            </Col> 
           </Row>
        </div>
      </>
{/*     
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                   
                  <TableCell>Name</TableCell>
                  <TableCell>Created at</TableCell> 
                  <TableCell>Updated at</TableCell> 
                  <TableCell>Action</TableCell> 
                </TableRow>
              </TableHead>
              <TableBody>
               
                  <TableRow
                    className={classes.tableRow}
                    hover
                   
                  > 
                    <TableCell></TableCell>
                    <TableCell>
                      
                  
                    </TableCell> 

                    <TableCell>
                   
                    </TableCell>

                      <TableCell>
                      <Fragment>
                       
                       <Button variant="contained"
                       color="primary"
                      >
                         Edit
                       </Button>

                       <Button variant="contained"
                       color="secondary"
                       endIcon={<DeleteIcon />}>
                         Delete
                       </Button>
                      </Fragment>
                         
                    </TableCell>  
                    
                  </TableRow>
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={users.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
     */}

    </Fragment>
    );
};

StaffsTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default observer(StaffsTable);
