import { useAuthStatus } from '../hooks/useAuthStatus';
import { Navigate } from 'react-router-dom';
import Spinner from './Spinner';

const Protected = ({ children }) => {
  const { isLoggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  } else return isLoggedIn ? children : <Navigate to='/user/log-in' />;
};

export default Protected;
