
/*eslint-disable*/
import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import menuItems from '../../menu/menuItems';
// reactstrap components
import { Nav, Collapse} from "reactstrap";

var ps;
const Sidebar = props => {
let sidebar= useRef(null);
const [isOpen, setIsOpen] = useState([]);

  const toggle = () => setIsOpen(prevState => !prevState);
useEffect(() => {
  if (navigator.platform.indexOf("Win") > -1) {
    ps = new PerfectScrollbar(".sidebar-wrapper", {
      suppressScrollX: true,
      suppressScrollY: false
    });
  }
  return () => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
}, [])
  
const activeRoute = (routeName) => {
  return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
}
const handleClick = (item) => {
  setIsOpen(prevState => ({ [item]: !prevState[item] }));
}
const handler = (children) => { 
  return children.map(subOption => {
    if (!subOption.children) {
      return ( 
          <li key={subOption.name}> 
            <NavLink
               to={subOption.url}
                  className="nav-link"
                  activeClassName="active"
                  onClick={subOption.toggleSidebar}
                  >
                     <i className={subOption.icon} />
                  <p>{ subOption.name }</p>
               
            </NavLink>
          </li> 
      );
    }
    return ( 
       <li key={subOption.name} onClick={() => handleClick(subOption.name)} > 
       <a data-toggle="collapse" aria-expanded={isOpen[subOption.name]}>
          <i className={subOption.icon} />
           <p>{subOption.name}
              <b className="caret"> </b>
           </p>
         </a> 
         <Collapse isOpen={isOpen[subOption.name]}>
            <Nav className="beedy-nav">
          {handler(subOption.children)} 
          </Nav>
           </Collapse>
          {/* {state[subOption.name] ? <ExpandLess /> : <ExpandMore />} */}
       {/* <li> */}   {/* </li> */}
   </li> 
    
   
    );
  });
}
const linkOnClick = () => {
  document.documentElement.classList.remove("nav-open");
};
  const { bgColor, routes, logo } = props;
    let logoImg = null;
    let logoText = null;

    if (logo !== undefined) {
      if (logo.outterLink !== undefined) {
        logoImg = (
          <a
            href={logo.outterLink}
            className="simple-text logo-mini"
            target="_blank"
            onClick={props.toggleSidebar}
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="react-logo" />
            </div>
          </a>
        );
        logoText = (
          <a
            href={logo.outterLink}
            className="simple-text logo-normal"
            target="_blank"
            onClick={props.toggleSidebar}
          >
            {logo.text}
          </a>
        );
      } else {
        logoImg = (
          <Link
            to={logo.innerLink}
            className="simple-text logo-mini"
            onClick={props.toggleSidebar}
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="react-logo" />
            </div>
          </Link>
        );
        logoText = (
          <Link
            to={logo.innerLink}
            className="simple-text logo-normal"
            onClick={props.toggleSidebar}
          >
            {logo.text}
          </Link>
        );
      }
    }

  return (
    <div className="sidebar" data={bgColor}>
      <div className="sidebar-wrapper" ref={sidebar}>
        {logoImg !== null || logoText !== null ? (
          <div className="logo">
            {logoImg}
            {logoText}
          </div>
        ) : null}
        <Nav>
        {handler(menuItems.data)}
         
        
        </Nav>
      </div>
    </div>
  );
}
 

Sidebar.defaultProps = { 
  bgColor: "primary",
  routes: [{}]
};

Sidebar.propTypes = {
  // if true, then instead of the routes[i].name, routes[i].rtlName will be rendered
  // insde the links of this component 
  bgColor: PropTypes.oneOf(["primary", "blue", "green", "orange", "red"]),
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the text of the logo
    text: PropTypes.node,
    // the image src of the logo
    imgSrc: PropTypes.string
  })
};

export default Sidebar;


