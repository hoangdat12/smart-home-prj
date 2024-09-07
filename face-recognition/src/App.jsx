import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ultils/ProtectedRoute';
import { useState } from 'react';
import { AuthContext } from './ultils/context/Auth';

import Login from './pages/Login';
import Home from './pages/Home';
import Setting from './pages/Setting';
import Account from './pages/Account';
import History from './pages/History';
import UserInformation from './pages/accountPages/UserInformation';
import ForgotPassword from './pages/accountPages/ForgotPassword';
import CreateAccountDevice from './pages/accountPages/CreateAccountDevice';
import NotAuthorized from './pages/accountPages/NotAuthorized';
import Terms from './pages/accountPages/Terms';
import HistoryDetail from './pages/HistoryDetail';
import FaceRecognition from './pages/FaceRecognition';
import HealthCheck from './pages/HealCheck';

function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/heal' element={<HealthCheck />} />

          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Home />} />
            <Route path='/face-recognition' element={<FaceRecognition />} />
            <Route path='/setting' element={<Setting />} />
            <Route path='/account' element={<Account />} />
            <Route path='/history' element={<History />} />
            <Route path='/history/:historyId' element={<HistoryDetail />} />
            <Route
              path='/account/user-information/:userId'
              element={<UserInformation />}
            />
            <Route
              path='/account/forgot-password'
              element={<ForgotPassword />}
            />
            <Route path='/account/registor' element={<CreateAccountDevice />} />
            <Route path='/account/terms' element={<Terms />} />
            <Route path='/not-authorized' element={<NotAuthorized />} />
          </Route>
          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
