import { Navigate } from 'react-router-dom';

const Protected = ({ children }) => {
  const userDetails = window.localStorage.getItem('userDetails')
    ? JSON.parse(window.localStorage.getItem('userDetails'))
    : '';

  if (userDetails) {
    return children;
  } else return <Navigate to='/user/log-in' />;
};

export default Protected;
