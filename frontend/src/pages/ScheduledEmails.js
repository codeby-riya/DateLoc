import React, { useEffect, useState } from 'react';

const ScheduledEmails = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const emailFromStorage = localStorage.getItem("userEmail");
    if (!emailFromStorage) {
      alert("❌ User not logged in. Please log in first.");
      return;
    }

    setUserEmail(emailFromStorage);

    fetch(`https://datelock.onrender.com/api/emails/all?userEmail=${emailFromStorage}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEmails(data);
        } else {
          setEmails([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching emails:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary fw-bold" style={{ fontSize: '2rem' }}>
        Scheduled Emails
      </h2>

      {loading ? (
        <p className="text-center text-muted">Loading your scheduled emails...</p>
      ) : emails.length === 0 ? (
        <p className="text-center text-muted">No scheduled emails found for {userEmail}.</p>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table border">
            <thead className="table-light">
              <tr>
                <th>Recipient Email ID</th>
                <th>Subject</th>
                <th>Scheduled Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((email, index) => (
                <tr key={index}>
                  <td>{email.email}</td>
                  <td>{email.subject}</td>
                  <td>{new Date(email.datetime).toLocaleString()}</td>
                  <td style={{ color: email.status === 'Sent' ? 'green' : 'red' }}>
                    {email.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ScheduledEmails;
