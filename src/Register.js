import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleGoogleSuccess = async (response) => {
    const decoded = jwtDecode(response.credential);
    console.log('Google registration success:', decoded);
    const user = {
      googleId: decoded.sub,
      email: decoded.email,
      username: decoded.name,
    };
    try {
      const response = await axios.post('http://localhost:5000/google-login', user);
      console.log(response.data);
      // Store the token in local storage
      localStorage.setItem('token', response.data.token);
      navigate('/login');
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  const handleGoogleFailure = () => {
    console.log('Google registration failed');
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={handleSubmit}>
            <h1 style={{ color: '#5C5696' }}>Register</h1>
            <div className="login__field">
              <input
                type="text"
                className="login__input"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="login__field">
              <input
                type="email"
                className="login__input"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="login__field">
              <input
                type="password"
                className="login__input"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="login__field">
              <input
                type="password"
                className="login__input"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="button login__submit">
              <span className="button__text">Register Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <div className="social-login">
            <h3>Register via</h3>
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

export default Register;
