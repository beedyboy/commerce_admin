
import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react" 
import {
  Button, Card, CardHeader, CardBody, CardFooter, FormGroup,
  Form, Input, Row, Col,Nav, NavItem, NavLink, TabPane, TabContent
} from "reactstrap";  
import CompanyStore from "../../stores/CompanyStore";
import SweetAlert from 'react-bootstrap-sweetalert'; 
import Helmet from "react-helmet";

const CompanyProfile = () => { 
  const companyStore = useContext(CompanyStore);
  const { profile, updateProfile, setResponse, response, message  } = companyStore;
  const [data, setData] = useState({
    id: '',
    name: '',
    address: '',  
    email: '',
    phone: ''
  });
  const [activeTab, setActiveTab] = useState("1");
  useEffect(() => {
    const data = profile && profile.id;  
    if(data) {
      setData(state => ({
        ...state, 
          id: profile.id,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
          name: profile.companyname,
      }));
    }
     
  }, [profile]); 
const handleChange = event => {
  event.persist(); 
  setData(formState => ({
    ...formState, 
      [event.target.name]:  event.target.value 
  }));
};
  const update = e => {
    e.preventDefault(); 
    updateProfile(data);
  }
  const hideAlert = () => {
    setResponse(false);
  }
  if (response === true) {
    // <Toast />
   
     
  }
    return (
      <>
         <Helmet>
            <title>Company Profile</title>
            <meta name="description" content="Company Profile" />
      </Helmet>
      {response  && 
       <SweetAlert
       success
       style={{display: "block", marginTop: "-50px"}}
       title="Server Message!" 
       confirmBtnBsStyle="info"
        onConfirm={() => hideAlert()}
       onCancel={() => hideAlert()}
   >
      {message}
   </SweetAlert>
      }
        <div className="content">

        <Card className="card-plain">
    <CardHeader>
      <div className="nav-tabs-navigation">
        <div className="nav-tabs-wrapper">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={activeTab === "1" ? "active" : ""}
                onClick={() => {
                  setActiveTab("1");
                }}
              >
                Company Profile
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink
                className={activeTab === "2" ? "active" : ""}
                onClick={() => {
                  setActiveTab("2");
                }}
              >
                Updates
              </NavLink>
            </NavItem>  */}
          </Nav>
        </div>
      </div>
    </CardHeader>
    <CardBody>
        <TabContent activeTab={activeTab} className="text-center">
            <TabPane tabId="1">
            <Row>
            <Col md="12">
              <Card>
               
                <CardBody>
                 
                  <Form onSubmit={update}>
                    <Row>
                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <label>Company Name </label>
                          <Input
                            value={data.name} 
                            onChange={handleChange}
                            placeholder="Company"
                            name="name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input onChange={handleChange} placeholder="email address" name="email" value={data.email} type="email" />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="6">
                        <FormGroup>
                          <label>Phone</label>
                          <Input
                            value={data.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            name="phone"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            value={data.address}
                            name="address"
                            onChange={handleChange}
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    <Col md="3">
                    <Button  color="primary" type="submit">
                    Save Changes
                  </Button>    
                  </Col>

                    </Row>  
                                  
                  </Form>
                </CardBody>
                <CardFooter>
                  
                </CardFooter>
              </Card>
            </Col>
              </Row>
            </TabPane>
             
            
        </TabContent>
    </CardBody>
</Card>

        
        </div>
      </>
    );
  } 

export default observer(CompanyProfile);



// <Col md="4">
// <Card className="card-user">
//   <CardBody>
//     <CardText />
//     <div className="author">
//       <div className="block block-one" />
//       <div className="block block-two" />
//       <div className="block block-three" />
//       <div className="block block-four" />
//       <a href="#pablo" onClick={e => e.preventDefault()}>
//         <img
//           alt="..."
//           className="avatar"
//           src={require("../assets/img/emilyz.jpg")}
//         />
//         <h5 className="title">{data.fullname}</h5>
//       </a>
//     <p className="description">{data.roleName}</p>
//     </div>
//     <div className="card-description">
//       Do not be scared of the truth because we need to restart the
//       human foundation in truth And I love you like Kanye loves
//       Kanye I love Rick Owens’ bed design but the back is...
//     </div>
//   </CardBody>
//   <CardFooter>
//     <div className="button-container">
//       <Button className="btn-icon btn-round" color="facebook">
//         <i className="fab fa-facebook" />
//       </Button>
//       <Button className="btn-icon btn-round" color="twitter">
//         <i className="fab fa-twitter" />
//       </Button>
//       <Button className="btn-icon btn-round" color="google">
//         <i className="fab fa-google-plus" />
//       </Button>
//     </div>
//   </CardFooter>
// </Card>
// </Col>
