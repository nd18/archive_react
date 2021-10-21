
import Cookies from 'js-cookie';
import {
    Route,
    Redirect
  } from 'react-router-dom';
  
  function PrivateRoute({ children, ...rest }) {
      const isAuthenticated = Cookies.get('idToken');
    return (
      <Route
        {...rest}
        render={
          ({ location }) => (
            isAuthenticated
              ? (
                children
              ) : (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: { from: location }
                  }}
                />
              ))
        }
      />
    );
  }
  
  export default PrivateRoute;