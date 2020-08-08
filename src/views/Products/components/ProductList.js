import React from 'react'; 
import { Card,  CardBody, Button } from 'reactstrap';
//import { useTable, usePagination } from 'react-table';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginatorFactory from 'react-bootstrap-table2-paginator';
import Switch  from 'react-bootstrap-switch';
 
const ProductList = props => {
  const { products: data, toggle, loading, ...rest } = props;
   
 
const activeFormatter = (cell, row) => {
	return (
		 <Switch 
			defaultValue={row.status === "Active" ? true : false}
			offColor="default"
			offText="Pending"
			onColor="success"
			onText="Active" 
			onChange={(el) => toggle(el, row.status, row.id)}
			name='status' />
		  
	)
}
  const actionFormatter = (cell, row) => { 
	return (
		<>
		<Button color="warning" size="sm"><i className="fa fa-edit"></i></Button>{" "}
		<Button color="danger" size="sm"><i className="fa fa-times"></i></Button>{" "}
		</>
	)
  }
const columns = [
	{dataField: "product_name", text: "Product Name"},
	{dataField: "catName", text: "Category"},
	{dataField: "shopName", text: "Shop",
	//filter: textFilter()
	}, 
	// {dataField: "available", text: "Qty"},
	// {dataField: "price", text: "Price"},
	{dataField: "created_at", text: "Date Created"},
	{
		dataField: "status",
		text: "Status", isDummy: true,
		csvExport: false,
		formatter: activeFormatter
	},
	{dataField: "actions", text: "Action",
		isDUmmyField: true, csvExport: false,
		formatter: actionFormatter
		},
];
  
	
    return (
			
			 <>
			 <Card>  			
			<CardBody>
			{loading ? <h2>Loading...</h2> :
			<BootstrapTable
				keyField="id"
				data={data}
				columns={columns}
				filter={ filterFactory()}
				 //filterPosition="bottom"
				pagination={paginatorFactory({					 
					showTotal: true,
					sizePerPageList: [
					{ text: '5', value: 5},
					{ text: '10', value: 10},
					{ text: '20', value: 20},
					{ text: 'All', value: data.length}
					]
					})}
			/>
			}
			</CardBody>
			</Card>  
		 </>
		   );
	
   
 
};
 

export default ProductList;
