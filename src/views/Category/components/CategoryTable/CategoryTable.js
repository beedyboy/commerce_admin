import React, { Fragment, useContext, useState } from 'react'; 
import PropTypes from 'prop-types';
import { observer } from "mobx-react" 
import { Card, CardHeader, CardBody, CardTitle, Table,  Row,  Col, Button } from 'reactstrap';   
import { TablePagination } from '../../../../shared/TablePagination';
import CategoryStore from '../../../../stores/CategoryStore';
import AddCategory from '../AddCategory';
 

const CategoryTable = props => {
  const { categories } = props; 
  const catStore = useContext(CategoryStore); 
  const {  removeCategory } = catStore;  

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
    setRowData(data); 
    setOpen(true);
  };
  const handleClose = () => { 
    setOpen(false);
  };  
  const removeRow = (id) => { 
    removeCategory(id);
    //  console.log('you wanna delete', id);
  };  
 
//Get current module
const indexOfLastPosts = currentPage * rowsPerPage;
const indexOfFirstPosts = indexOfLastPosts - rowsPerPage;
const currentPosts = categories.slice(indexOfFirstPosts, indexOfLastPosts);
// const noOfPages =  Math.ceil(cats.length / rowsPerPage);
  
   
  return (
    <Fragment>
     <AddCategory open={open} mode="Edit"  initial_data={rowData} handleClose={handleClose} />
     <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Category</CardTitle>
                </CardHeader>
                <CardBody> 
                  
      <Table className="tablesorter" responsive>
    <thead>
        <tr>
            {/* <th className="text-center">#</th> */}
            <th>Name</th>
            <th>Description</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th className="text-right">Actions</th>
        </tr>
    </thead>
    <tbody>
    {currentPosts.slice(0, rowsPerPage).map(( cat, i) => (
    <tr key={cat.id} >
            {/* <td className="text-center">{i + 1}</td> */}
            <td> {cat.name} </td>
            <td>{cat.description.length > 20 ? cat.description.slice(0, 20) + ' . . .' : cat.description} </td>
            <td>{cat.created_at}</td>
            <td>{cat.updated_at}</td>
            <td className="text-right">
                
                <Button onClick={() => editRow(cat) } className="btn-simple" color="success" size="sm">
                   Edit
                </Button>{` `}
                <Button className="btn-simple" onClick={()=> removeRow(cat.id)} color="danger" size="sm">
                   Delete
                </Button>{` `}
            </td>
        </tr>
         ))}
    </tbody>
</Table>
<nav>
  <TablePagination pagesCount={categories.length} postsPerPage={rowsPerPage}  currentPage={currentPage}
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
          count={cats.length}
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

CategoryTable.propTypes = {
  className: PropTypes.string,
  categories: PropTypes.array.isRequired
};

export default observer(CategoryTable);
