import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import LogIn from './components/LogIn';
import LandingPage from './Pages/LandingPage';
import SignUp from './components/SignUp';
import Protected from './components/Protected';
import UpdateProfile from './components/UpdateProfile';
import { TaskProvider } from './context/TaskContext';
import { Toaster } from 'react-hot-toast';

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
          <Route path='/updateProfile' element={<UpdateProfile />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </TaskProvider>
  );
}

export default App;
