import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ mobile: '', password: '' });

  const validateMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile) ? '' : 'Invalid mobile number';
  };

  const validatePassword = (password) => {
    return password.length >= 6 ? '' : 'Password must be at least 6 characters';
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const mobileError = validateMobile(mobile);
    const passwordError = validatePassword(password);
    if (mobileError || passwordError) {
      setErrors({ mobile: mobileError, password: passwordError });
    } else {
      setErrors({ mobile: '', password: '' });
      onLogin();
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>NxtWave Resource Management</h1>
        <h2>Login</h2>
        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit" disabled={!mobile || !password}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
