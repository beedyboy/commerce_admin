import React from 'react'; 
import { Card, CardImg, CardBody, CardTitle, CardText, Button, Nav } from 'reactstrap';
import { TablePagination } from '../../../shared/TablePagination';

const ProductCard = props => {
  const { products, loading, ...rest } = props; 
  const [rowsPerPage, setRowsPerPage] = useState(2);
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
  const indexOfLastPosts = currentPage * rowsPerPage;
const indexOfFirstPosts = indexOfLastPosts - rowsPerPage;
const currentPosts = products.slice(indexOfFirstPosts, indexOfLastPosts);
  if(loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
   {currentPosts.slice(0, rowsPerPage).map((product) =>  
            
        <Card  key={product.id}>
        <CardImg top width="100%" src={product.image ? product.image : "/assets/318x180.svg"} alt="Card image cap" />
        <CardBody>
          <CardTitle>{product.product_name}</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>{product.catName}.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card> 
   )}
  <Nav>
  <TablePagination pagesCount={products.length} postsPerPage={rowsPerPage}  currentPage={currentPage}
   paginate={handlePaginate} handlePreviousClick={handlePreviousClick} handleNextClick={handleNextClick}
    />
  </Nav>
   </>
  );
 
};
 

export default ProductCard;
