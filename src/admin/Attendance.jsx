import React from 'react';

const Attendance = () => {
  const attendance = [
    { name: 'Ali Raza', date: '24-Oct-2026', status: 'Present' },
    { name: 'Usman', date: '24-Oct-2026', status: 'Absent' },
    { name: 'Bilal', date: '24-Oct-2026', status: 'Present' },
  ];

  return (
    <div className="admin-content">
      <div className="header-row">
        <div>
          <h1>Staff Attendance</h1>
          <p>Track daily attendance of your staff.</p>
        </div>
      </div>
      <div className="box-card">
        <table>
          <thead><tr><th>Staff Name</th><th>Date</th><th>Status</th></tr></thead>
          <tbody>
            {attendance.map((a, i) => (
              <tr key={i}>
                <td><strong>{a.name}</strong></td>
                <td>{a.date}</td>
                <td><span className={`badge ${a.status === 'Present' ? 'delivered' : 'pending'}`}>{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// YEH LINE SABSE ZAROORI HAI
export default Attendance;