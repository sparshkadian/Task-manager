import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const Protected = ({ children }) => {
  const auth = getAuth();
  const userDetails = window.localStorage.getItem('userDetails')
    ? JSON.parse(window.localStorage.getItem('userDetails'))
    : '';

  if (userDetails || auth) {
    return children;
  } else return <Navigate to='/user/log-in' />;
};

export default Protected;
