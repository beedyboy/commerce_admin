import React from 'react';
import { Route, Redirect } from 'react-router-dom'; 
import Utility from '../shared/Storage'; 


const PrivateRoute = props => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => (
        Utility.get('admin_token')
        ?
        <Layout  {...matchProps}>
          <Component/>
        </Layout>
         :

         <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
      
      )}
    />
  );
};
 

export default PrivateRoute;
// const PrivateRoute = props => {
//   const { layout: Layout, component: Component, ...rest } = props;
//   console.log(props);

//   return (
//    <>
//     <Route 
//       {...rest}
//       render={matchProps => 
//         <Layout {...matchProps}>
//           <Component />
//         </Layout>
//         }
//     />
//    </>
//   );
// };
 

// export default PrivateRoute;


