// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'

import { UserState } from './contexts/user/UserContext'
import { LoginState } from './contexts/user/LoginContext';


function App() {
  return (
    <>
    <UserState>
      <LoginState>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/signup" element={<Signup/>}/>
            {/*<Route path="*" element={<NotFound/>}/>*/}
          </Routes>
        </Router>         
      </LoginState>
     
    </UserState>
    </>
  );
}

export default App;
