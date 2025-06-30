import React from 'react';

const About = () => {
  return (
    <div className="container mt-5">
      <div className="bg-light p-5 rounded shadow-sm">
        <h2 className="mb-4 text-center text-primary">About DateLock</h2>
        <p className="lead">
          <strong>DateLock</strong> is a smart email scheduling tool that allows users to schedule emails based on both <strong>time</strong> and <strong>location</strong>.
        </p>
        <p>
          Whether you're traveling, working across time zones, or simply planning ahead, DateLock ensures your messages are delivered at the perfect moment — automatically.
        </p>
        <ul className="list-group list-group-flush mt-4">
          <li className="list-group-item">✔Schedule emails to be sent on a specific date & time</li>
          <li className="list-group-item">📍 Location-based triggers(coming soon) </li>
          <li className="list-group-item">💡 Smart dashboard to manage scheduled & sent emails</li>
          <li className="list-group-item">🔒 Your data is secure & confidential</li>
        </ul>
        <div className="mt-4 text-center">
          <em>Built with using React, Node.js, and Gmail API</em>
        </div>
      </div>
    </div>
  );
};

export default About;
