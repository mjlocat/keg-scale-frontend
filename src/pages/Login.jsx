import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import './Login.css';

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = formData;
    try {
      let response = await axios.post('/api/auth/login', {
        username: username,
        password: password,
      });
      await login(response.data.token);
    } catch (error) {
      console.error(error);
    }
  }
  const handleChange = (e) => {
    const {name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  }
  return (
    <div className="Login" onSubmit={handleLogin} onKeyDown={handleKeyDown}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </div>
  );
}


// export default function Login() {
//   const [token, setToken] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isAuthenticated) {
//       console.log('User is authenticated');
//       navigate('/config');
//     }
//   }, [isAuthenticated, navigate]);

//   const onLoginClick = async (e) => {
//     e.preventDefault();
//     const { username, password } = formData;
//     try {
//       let response = await axios.post('/api/auth/login', {
//         username: username,
//         password: password,
//       });
//       sessionStorage.setItem('token', JSON.stringify(response.data.token));
//       console.log(response.data);
//       setToken(response.data.token)
//       console.log(token);
//       setIsAuthenticated(true); // Update authentication state
//       console.log('isAuthenticated: ', isAuthenticated);
//       // navigate('/config');
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   const handleChange = (e) => {
//     const {name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   }

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       onLoginClick(e);
//     }
//   }

//   return (
//     <div className="LoginContainer">
//       <NavBar />
//       <div className="Login" onKeyDown={handleKeyDown}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         <button
//           onClick={async (e) => {
//             await onLoginClick(e);
//           }
//         }>
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }
