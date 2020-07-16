import React, {  useContext, useState } from 'react'; 
import PropTypes from 'prop-types'
import CompanyStore from '../../../../stores/CompanyStore';
import { Table, Button } from 'reactstrap';
import { TablePagination } from '../../../../shared/TablePagination';

const PagesList = props => {
    const { pages } = props; 
    const companyStore = useContext(CompanyStore); 
    const {  removePage } = companyStore;  
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
    
    const removeRow = (id) => { 
        removePage(id); 
    }; 
    //Get current module
const indexOfLastPosts = currentPage * rowsPerPage;
const indexOfFirstPosts = indexOfLastPosts - rowsPerPage;
const currentPosts = pages.slice(indexOfFirstPosts, indexOfLastPosts);
    return (
        <div>
            
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th> Title </th>
                        <th> Created</th>
                        <th>Updated</th>
                        <th className="text-center">Action</th>
                      </tr>
                
                    </thead>
                    <tbody>
                      {currentPosts.slice(0, rowsPerPage).map(page => (
                        <tr key={page.id}>
                        <td>{page.title} </td>
                        <td>{page.created_at}</td>
                        <td>{page.updated_at}</td>
                        <td className="text-center">
                       
                <Button className="btn-simple" onClick={() => editRow(page) }
                     color="success" size="sm">
                    Edit
                </Button>{` `}
                <Button className="btn-simple" color="danger" 
                       onClick={()=> removeRow(page.id)} size="sm">
                   Delete
                </Button>{` `}
                        </td>
                      </tr>
                            
                ))}
                      
                    </tbody>
                  </Table>
                  <nav>
  <TablePagination pagesCount={pages.length} postsPerPage={rowsPerPage}  currentPage={currentPage}
   paginate={handlePaginate} handlePreviousClick={handlePreviousClick} handleNextClick={handleNextClick}
    />
</nav>            
        </div>
    )
}

PagesList.propTypes = { 
    pages: PropTypes.array.isRequired
}

export default PagesList
