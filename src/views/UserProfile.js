
import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react"

// reactstrap components
import {
  Button, Card, CardHeader, CardBody, FormGroup,
  Form, Input, Row, Col,Nav, NavItem, NavLink, TabPane, TabContent
} from "reactstrap";
import UserStore from "../stores/UserStore";
import Helmet from "react-helmet";

const UserProfile = () => { 
  const userStore = useContext(UserStore);
  const { profile  } = userStore;
  const [data, setData] = useState(profile[0])
  const [activeTab, setActiveTab] = useState("1");
  useEffect(() => {
    setData(profile[0]) 
  }, [profile]);
  // console.log('profile', data);
    return (
      <>   <
        Helmet>
      <title>Profile</title>
      <meta name="description" content="Profile" />
</Helmet>
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
                Edit Profile
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
                 
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <label>Full Name</label>
                          <Input
                            defaultValue={data.fullname}
                            placeholder="Fullname"
                            type="text"
                          />
                        </FormGroup>
                      </Col> 
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Role </label>
                          <Input
                            defaultValue={data.roleName}
                            disabled
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            defaultValue={data.username}
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input placeholder="email address" defaultValue={data.email} type="email" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                 
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            cols="80"
                            defaultValue="Admin description."
                            placeholder="Here can be your description"
                            rows="4"
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                    <Button  className="btn-fill"  color="primary" type="submit">
                    Save Changes
                  </Button>    
                  </Col>
                    </Row>
                  </Form>
                </CardBody> 
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

export default observer(UserProfile);



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
