import React, { Fragment, useContext, useState } from 'react'; 
import PropTypes from 'prop-types';
import { observer } from "mobx-react" 
import { Card, CardHeader, CardBody, CardTitle, Table,  Row,  Col, Button } from 'reactstrap'; 
import RoleStore from '../../../../stores/RoleStore';
import AddRole from '../AddRole';
import { TablePagination } from '../../../../shared/TablePagination';
 

const RolesTable = props => {
  const { roles } = props; 
  const roleStore = useContext(RoleStore); 
  const {  removeRole } = roleStore;  

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [rowData, setRowData] = React.useState();  
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
 
  const handlePageChange = (event, page) => {
    setPage(page);
  };
 

  const editRow = ( data) => {  
    // console.log('data', data);
    setRowData(data); 
    setOpen(true);
  };
  const handleClose = () => { 
    setOpen(false);
  };  
  const removeRow = (id) => { 
    removeRole(id);
    //  console.log('you wanna delete', id);
  };  
 
//Get current module
const indexOfLastPosts = currentPage * rowsPerPage;
const indexOfFirstPosts = indexOfLastPosts - rowsPerPage;
const currentPosts = roles.slice(indexOfFirstPosts, indexOfLastPosts);
// const noOfPages =  Math.ceil(roles.length / rowsPerPage);
  
   
  return (
    <Fragment>
     <AddRole open={open} mode="Edit"  initial_data={rowData} handleClose={handleClose} />
     <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Roles</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th> Name </th>
                        <th> Created</th>
                        <th>Updated</th>
                        <th className="text-center">Action</th>
                      </tr>
                
                    </thead>
                    <tbody>
                      {currentPosts.slice(0, rowsPerPage).map(role => (
                        <tr key={role.id}>
                        <td>{role.name} </td>
                        <td>{role.created_at}</td>
                        <td>{role.updated_at}</td>
                        <td className="text-center">
                       
                <Button className="btn-simple" onClick={() => editRow(role) }
                     color="success" size="sm">
                    Edit
                </Button>{` `}
                <Button className="btn-simple" color="danger" 
                       onClick={()=> removeRow(role.id)} size="sm">
                   Delete
                </Button>{` `}
                        </td>
                      </tr>
                            
                ))}
                      
                    </tbody>
                  </Table>
                  <nav>
  <TablePagination pagesCount={roles.length} postsPerPage={rowsPerPage}  currentPage={currentPage}
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
          count={roles.length}
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

RolesTable.propTypes = {
  className: PropTypes.string,
  roles: PropTypes.array.isRequired
};

export default observer(RolesTable);
