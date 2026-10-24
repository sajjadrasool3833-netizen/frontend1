import React from 'react';

const Salary = () => {
  const staff = [
    { name: 'Ali Raza', role: 'Manager', salary: 45000, status: 'Paid' },
    { name: 'Usman', role: 'Packer', salary: 25000, status: 'Pending' },
    { name: 'Bilal', role: 'Delivery', salary: 20000, status: 'Paid' },
  ];

  return (
    <div className="admin-content">
      <div className="header-row">
        <div>
          <h1>Salary Manager</h1>
          <p>Manage staff salaries and payments.</p>
        </div>
      </div>
      <div className="box-card">
        <table>
          <thead><tr><th>Staff Name</th><th>Role</th><th>Salary (Rs)</th><th>Status</th></tr></thead>
          <tbody>
            {staff.map((s, i) => (
              <tr key={i}>
                <td><strong>{s.name}</strong></td>
                <td>{s.role}</td>
                <td>{s.salary.toLocaleString()}</td>
                <td><span className={`badge ${s.status === 'Paid' ? 'delivered' : 'pending'}`}>{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Salary;