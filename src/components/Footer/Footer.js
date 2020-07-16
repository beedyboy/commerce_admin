
/*eslint-disable*/
import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// reactstrap components
import { Container, Row, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          <Nav>
            <NavItem>
              <NavLink href="https://www.creative-tim.com/?ref=bdr-user-archive-footer">User Agreement</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://www.creative-tim.com/presentation?ref=bdr-user-archive-footer">Privacy Policy</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://www.creative-tim.com/blog?ref=bdr-user-archive-footer">Cookie Policy</NavLink>
            </NavItem>
          </Nav>
          <div className="copyright">
            © {new Date().getFullYear()} made with{" "}
            <i className="tim-icons icon-heart-2" /> by{" "}
            <a
              href="https://commerce.devprima.com"
              target="_blank"
            >
             Ecommerce
            </a>{" "}
            for a better web.
          </div>
        </Container>
      </footer>
    );
  }
}

export default Footer;
