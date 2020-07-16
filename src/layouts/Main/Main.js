
import React, { useEffect, useState, useRef } from "react";
// import { Route } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Footer from "../../components/Footer/Footer.js"; 
import Sidebar from "../../components/Sidebar/Sidebar"; 

// import routes from "routes.js";

import logo from "../../assets/img/react-logo.png";
import Menus from "../../menu/menus.js";
// import Menus from "../../Menu/enus";

var ps;
const MainLayout = props => {
  const [backgroundColor] = useState("blue");
  const [sidebarOpened, setSidebarOpened] = useState(false);
 let mainPanel = useRef(null);
  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(".main-panel", { suppressScrollX: true });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    return () => {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.className += " perfect-scrollbar-off";
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    }
  }, [])
   
  
   useEffect(() => {
    // console.log('props', props);
    if (props.history && props.history.action === "PUSH") {
      if (navigator.platform.indexOf("Win") > -1) {
        let tables = document.querySelectorAll(".table-responsive");
        console.log('tables', tables);
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainPanel.current.scrollTop = 0;
    }
   }, [props])
   
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setSidebarOpened(!sidebarOpened); 
  };
  const getBrandText = path => {
    for (let i = 0; i < Menus.length; i++) {
      if (
        props.location.pathname.indexOf( Menus[i].path
        ) !== -1
      ) {
        return Menus[i].name;
      }
    }
    return "Brand";
  };
  return (
    
      <div className="wrapper">
        <Sidebar
          {...props}
          routes={Menus}
          bgColor={backgroundColor}
          logo={{
            outterLink: "http://commerce.devprima.com/",
            text: "Ecommerce",
            imgSrc: logo
          }}
          toggleSidebar={toggleSidebar}
        />
        <div
          className="main-panel"
          ref={mainPanel}
          data={backgroundColor}
        >
          <AdminNavbar
            {...props}
            brandText={getBrandText(props.location.pathname)}
            toggleSidebar={toggleSidebar}
            sidebarOpened={sidebarOpened}
          />
         {props.children}
          
          {// we don't want the Footer to be rendered on map page
          props.location.pathname.indexOf("maps") !== -1 ? null : (
            <Footer fluid />
          )}
        </div>
      </div>
      
   
  );
}

// class MainLayout extends React.Component {
//   constructor(props) {
//     super(props);
//     state = {
//       backgroundColor: "blue",
//       sidebarOpened:
//         document.documentElement.className.indexOf("nav-open") !== -1
//     };
//     console.log('props', props);
//   }
 
//   // this function opens and closes the sidebar on small devices
  
//   getRoutes = routes => {
//     return routes.map((prop, key) => {
//       if (prop.layout === "/main") {
//         return (
//           <Route
//             path={prop.path}
//             component={prop.component}
//             key={key}
//           />
//         );
//       } else {
//         return null;
//       }
//     });
//   };
//   handleBgClick = color => {
//     setState({ backgroundColor: color });
//   };
 
//   render() {
   
//   }
// }

export default MainLayout;
