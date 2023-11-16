import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Layout from './Components/Layout'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import Jobs from './Pages/Jobs/Jobs'
import Contact from './Pages/Contact/Contact'
import Login from './Pages/Login/Login'
import { useState } from 'react';


function App() {

  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  }

  const handleLogout = () => {
    setUser(null);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout user={user} handleLogout={handleLogout}/>}>
          <Route path="login" element={<Login onLogin={handleLogin} />}/>
          <Route path="home" element={<Home user={user}/>} />
          <Route path="jobs" element={<Jobs user={user} />} />
          <Route path="contact" element={<Contact user={user} />} />
          <Route path="about" element={<About user={user}/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
