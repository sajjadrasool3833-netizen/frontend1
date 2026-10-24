import React, { useState, useEffect } from 'react';
import API from '../services/api';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    API.get('/contact').then(res => setMessages(res.data)).catch(err => console.log(err));
  }, []);

  return (
    <>
      <div className="page-title"><h1>Contact Messages</h1></div>
      <div className="admin-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Email</th><th>Subject</th><th>Message</th></tr></thead>
            <tbody>
              {messages.length === 0 ? <tr><td colSpan="4">No messages found.</td></tr> : messages.map(m => (
                <tr key={m._id}>
                  <td>{m.name}</td><td>{m.email}</td><td>{m.subject}</td><td>{m.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Messages;