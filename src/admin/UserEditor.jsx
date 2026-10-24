import React from 'react';
import { Trash2, Edit } from 'lucide-react';

const UserEditor = () => {
  const users = [
    { name: 'Ahmed Khan', email: 'ahmed@example.com', role: 'Customer', joined: '2026-10-20' },
    { name: 'Sana Rehman', email: 'sana@example.com', role: 'Admin', joined: '2026-10-22' },
    { name: 'Muhammad Nawaz', email: 'nawaz@example.com', role: 'Customer', joined: '2026-10-23' },
  ];

  return (
    <div className="admin-content">
      <div className="header-row">
        <div>
          <h1>User Editor</h1>
          <p>Manage customer accounts and admin roles.</p>
        </div>
      </div>
      <div className="box-card">
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined Date</th><th>Action</th></tr></thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i}>
                <td><strong>{u.name}</strong></td>
                <td>{u.email}</td>
                <td><span className={`badge ${u.role === 'Admin' ? 'delivered' : 'pending'}`}>{u.role}</span></td>
                <td>{u.joined}</td>
                <td style={{display: 'flex', gap: '10px'}}>
                  <button className="btn-edit"><Edit size={16}/></button>
                  <button className="btn-delete"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UserEditor;