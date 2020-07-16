import React, { useState, Fragment } from "react";
import SweetAlert from 'react-bootstrap-sweetalert';

const Toast = props => {
const { show, type, message } = props;
const [open, setOpen] = useState(show); 
    const hideAlert = () => {
        setOpen(false);
    } 
    return (

      <Fragment>
           {open & open ?
        (<SweetAlert 
        type={type}
        style={{display: "block", marginTop: "60px"}}
        title="Server Message!" 
        confirmBtnBsStyle="info"
         onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
    >
       {message}
    </SweetAlert>) :
    null
    }
      </Fragment>
    )
}
export default Toast;
// const Toast = props => {
//     notify = place => {
//         var color = Math.floor(Math.random() * 5 + 1);
//         var type;
//         switch (color) {
//           case 1:
//             type = "primary";
//             break;
//           case 2:
//             type = "success";
//             break;
//           case 3:
//             type = "danger";
//             break;
//           case 4:
//             type = "warning";
//             break;
//           case 5:
//             type = "info";
//             break;
//           default:
//             break;
//         }
//         var options = {};
//         options = {
//           place: place,
//           message: (
//             <div>
//               <div>
//                 Welcome to <b>Black Dashboard React</b> - a beautiful freebie for
//                 every web developer.
//               </div>
//             </div>
//           ),
//           type: type,
//           icon: "tim-icons icon-bell-55",
//           autoDismiss: 7
//         };
//         notificationAlert.notificationAlert(options);
//       };
//       return (
//           <>
//            <NotificationAlert ref="notificationAlert" />
//            </>
//       )
// }
