import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth'
import PropTypes from "prop-types";

const AuthRoute = ({children}) => {
  const authCtx = useAuth();
  const location = useLocation();
  
  return (
    authCtx.role.toLowerCase() == "admin" ? children 
      : <Navigate to="/" state={{ from:location}} replace />
  )
}

AuthRoute.propTypes = {
  children: PropTypes.element
}

export default AuthRoute