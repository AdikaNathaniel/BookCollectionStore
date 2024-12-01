import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Navbar from './components/Navbar';
import Books from './components/Books';
import Login from './views/AuthViews/Login';
import Dashboard from './views/Dashboard';
import Logout from './views/AuthViews/Logout';
import AddBook from './views/BookViews/AddBook';
import AddStudent from './views/StudentViews/AddStudent';
import EditBook from './views/BookViews/EditBook';
import DeleteBook from './views/BookViews/DeleteBook';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [role, setRole] = useState('');

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:3006/auth/verify')
      .then(res => {
        if (res.data.login) {
          setRole(res.data.role);
        } else {
          setRole('');
        }
        console.log(res);
      }).catch(err => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <Navbar role={role} />
      <Routes>
        <Route path='/' element={<Home setRole={setRole} />} />
        <Route path='/books' element={<Books role={role} />} />
        <Route path='/login' element={<Login setRoleVar={setRole} />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/addstudent' element={<AddStudent />} />
        <Route path='/logout' element={<Logout setRole={setRole} />} />
        <Route path='/addbook' element={<AddBook />} />
        <Route path='/book/:id' element={<EditBook />} />
        <Route path='/delete/:id' element={<DeleteBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;