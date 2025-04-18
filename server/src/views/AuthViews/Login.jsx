import {useNavigate} from 'react-router-dom'
import '../../css/Login.css'
import axios from 'axios'
import { useState } from 'react'
import PropTypes from 'prop-types'
const Login = ({ setRoleVar }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('admin')
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  const handleSubmit = () => {
    axios.post('http://localhost:3006/auth/login', {username, password, role})
    .then(res => {
      if(res.data.login && res.data.role === 'admin') {
        setRoleVar('admin')
        navigate('/dashboard')
      } else if (res.data.login && res.data.role === 'student') {
        setRoleVar("student")
        navigate('/')
      }
      console.log(res)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='login-page'>
      <div className="login-container">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" placeholder='Enter Username'
           onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" placeholder='Enter Password'
           onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select name="role" id="role"
           onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>
        <button className='btn-login' onClick={handleSubmit}>Login</button>
      </div>
    </div>
  )
}
Login.propTypes = {
  setRoleVar: PropTypes.func.isRequired,
}

export default Login
