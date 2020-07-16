import React, { useContext, useState } from "react";
import { observer } from "mobx-react" 
import {  Card, CardHeader, CardBody, Row, Col,Nav, NavItem, NavLink, TabPane, TabContent
} from "reactstrap";  
import CompanyStore from "../../../stores/CompanyStore";
import PagesList from "./PagesTable/PagesList";
import AddPage from "./AddPage/AddPage";
import Helmet from "react-helmet";
// import PropTypes from 'prop-types'

const Pages = props => {
    const companyStore = useContext(CompanyStore);
    const { loading, pages } = companyStore;
    const [activeTab, setActiveTab] = useState("1");
    return (
        <div className="content">
               <Helmet>
            <title>Pages</title>
            <meta name="description" content="Pages" />
      </Helmet>
            <Row>
                <Col md="12"> 
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
                            Pages
                        </NavLink>
                        </NavItem>

                        <NavItem>
                        <NavLink
                            className={activeTab === "2" ? "active" : ""}
                            onClick={() => {
                            setActiveTab("2");
                            }}
                        >
                            Create
                        </NavLink>
                        </NavItem>
                    </Nav> 
                    </div>
      </div>
      </CardHeader>
    <CardBody>
        <TabContent activeTab={activeTab} className="text-center">
            <TabPane tabId="1">
              <PagesList pages={pages} />
            </TabPane>
            <TabPane tabId="2">
                <AddPage mode="Add" />
            </TabPane>
            </TabContent>
            </CardBody> 
            </Card>
                </Col>
            </Row>
        </div>
    )
}

// Pages.propTypes = {

// }

export default observer(Pages);
