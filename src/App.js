import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home';
import LogIn from './components/LogIn';
import LandingPage from './Pages/LandingPage';
import SignUp from './components/SignUp';
import Protected from './components/Protected';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route path='/user/sign-up' element={<SignUp />} />
          <Route path='/user/log-in' element={<LogIn />} />
          <Route
            path='/home'
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
        </Routes>
        <ToastContainer
          position='top-center'
          autoClose={2000}
          hideProgressBar={true}
        />
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;
