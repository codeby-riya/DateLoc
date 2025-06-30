import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function GoogleLoginButton() {
  const handleLoginSuccess = async (response) => {
    try {
      const code = response.code;

      // Send auth code to backend
      const res = await axios.post('https://datelock.onrender.com/api/auth/google', {
        code: code,
      });

      console.log('User authenticated:', res.data);
      alert('Login successful! Gmail token stored.');
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed');
    }
  };

  const handleLoginError = () => {
    alert('Google login failed');
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
        flow="auth-code"
        useOneTap={false}
        scope="https://www.googleapis.com/auth/gmail.send"
      />
    </div>
  );
}

export default GoogleLoginButton;
