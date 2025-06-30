import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Home = () => {
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('userEmail'));

  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
    datetime: '',
    location: ''
  });
const login = useGoogleLogin({
  flow: 'auth-code',
  onSuccess: async (tokenResponse) => {
    const code = tokenResponse.code;
    if (!code) {
      alert("❌ Google login failed: No auth code returned.");
      return;
    }

    try {
      const res = await axios.post("https://datelock.onrender.com/api/auth/google", {
        code: code
      });

      if (res.data && res.data.email) {
        setUserEmail(res.data.email);
        setIsAuthenticated(true);
        localStorage.setItem('userEmail', res.data.email);
        alert("✅ Logged in as " + res.data.email);
      } else {
        alert("❌ Backend did not return email.");
      }

    } catch (error) {
      console.error('Backend login error:', error);
      alert("❌ Login failed: Backend error");
    }
  },
  onError: () => {
    alert("❌ Google login popup failed.");
  },
  scope: 'https://www.googleapis.com/auth/gmail.send',
  redirect_uri: 'https://datelock.vercel.app'  // ✅ Add this!
});

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      sender: userEmail
    };

    const res = await fetch("https://datelock.onrender.com/api/emails/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Your email has been scheduled.");
      setFormData({
        email: '',
        subject: '',
        message: '',
        datetime: '',
        location: ''
      });
    } else {
      alert("❌ Error: " + (data.message || "Something went wrong."));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setUserEmail(null);
    setIsAuthenticated(false);
  };

  return (
    <>
      {!isAuthenticated && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h3 className="mb-4 text-center">Log in to DateLock</h3>
            <div className="d-flex justify-content-center">
              <button className="btn btn-outline-primary" onClick={() => login()}>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      )}

      {isAuthenticated && (
        <div className="container mt-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-primary fw-bold" style={{ fontSize: '2rem' }}>
              Schedule Your Email with DateLock
            </h2>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <p className="text-muted">
            Logged in as <strong>{userEmail}</strong>
          </p>

          <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
            <div className="mb-3">
              <label className="form-label">Recipient's Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Subject</label>
              <input
                type="text"
                className="form-control"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter email subject"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here"
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Date and Time</label>
              <input
                type="datetime-local"
                className="form-control"
                name="datetime"
                required
                value={formData.datetime}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Location (optional)</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Schedule Email
            </button>
          </form>
        </div>
      )}
    </>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    zIndex: 9999,
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    background: 'rgba(255,255,255,0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  popup: {
    background: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    width: '350px',
    textAlign: 'center'
  }
};

export default Home;
