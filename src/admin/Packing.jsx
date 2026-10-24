import React from 'react';

const Packing = () => {
  // Sample Packing Data
  const packingQueue = [
    { id: 'ORD-1001', item: 'Premium Peshawari Chappal', qty: 2, status: 'Ready to Pack' },
    { id: 'ORD-1002', item: 'Cotton Vests (M)', qty: 5, status: 'Packing in Progress' },
    { id: 'ORD-1003', item: 'Brown Leather Shoes', qty: 1, status: 'Ready to Pack' },
  ];

  return (
    <div className="admin-content">
      <div className="header-row">
        <div>
          <h1>Packaging Queue</h1>
          <p>Orders that need to be packed and shipped.</p>
        </div>
      </div>
      <div className="box-card">
        <table>
          <thead><tr><th>Order ID</th><th>Product</th><th>Quantity</th><th>Packing Status</th></tr></thead>
          <tbody>
            {packingQueue.map((p, i) => (
              <tr key={i}>
                <td><strong>{p.id}</strong></td>
                <td>{p.item}</td>
                <td>{p.qty}</td>
                <td><span className="badge pending">{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Packing;