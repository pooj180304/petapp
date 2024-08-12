import React, { useState } from 'react';
import './Login.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() }); // Trim whitespace
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted data:', formData); // Log submitted data

    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      console.log(response.data);
      navigate('/menupage');
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login error:', error);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const decoded = jwtDecode(response.credential);
      const { email, sub: googleId, name: username } = decoded;
      const backendResponse = await axios.post('http://localhost:5000/google-login', {
        googleId,
        email,
        username,
      });

      console.log('Google login success:', backendResponse.data);
      navigate('/menupage');
    } catch (error) {
      console.error('Google login error:', error);
      setError('Google login failed');
    }
  };

  const handleGoogleFailure = () => {
    console.log('Google login failed');
    setError('Google login failed');
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login1" onSubmit={handleSubmit}>
            <h1 style={{ color: '#5C5696' }}>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                className="login__input"
                name="email"
                placeholder="User name / Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="button login__submit">
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <div className="social-login">
            <h3>Log in via</h3>
            <div className="social-icons">
              <GoogleOAuthProvider clientId="233519597543-3ueoc74bf4blq1flgimoa5cklr2e7s74.apps.googleusercontent.com">
                <GoogleLogin
                  type='icon'
                  theme='outline'
                  size='small'
                  shape='pill'
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleFailure}
                />
              </GoogleOAuthProvider>
            </div>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
}

export default Login;
