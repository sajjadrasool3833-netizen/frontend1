import React, { useState } from 'react';
import { CreditCard, CheckCircle, XCircle, Save, Building, Truck } from 'lucide-react';

const Payments = () => {
  // States for Payment Methods
  const [codActive, setCodActive] = useState(true);
  const [bankActive, setBankActive] = useState(true);
  
  // Bank Details State
  const [bankDetails, setBankDetails] = useState({
    bankName: 'Meezan Bank',
    accountTitle: 'TTS Collection',
    accountNumber: '01234567890123',
    iban: 'PK36MEZN0001234567890123'
  });

  // Save Handler
  const handleSave = (e) => {
    e.preventDefault();
    alert('Payment settings saved successfully!');
  };

  return (
    <div className="admin-content">
      
      <div className="header-row">
        <div>
          <h1>Payment Methods</h1>
          <p>Configure how you want to receive payments from your customers.</p>
        </div>
      </div>

      <div className="dashboard-grid-advanced" style={{ gridTemplateColumns: '1fr 1fr' }}>
        
        {/* 1. Cash on Delivery (COD) */}
        <div className="box-card">
          <div className="box-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="stat-icon icon-orange" style={{ width: '40px', height: '40px' }}><Truck size={20} /></div>
              <h2>Cash on Delivery (COD)</h2>
            </div>
            
            {/* Toggle Switch */}
            <label className="switch">
              <input type="checkbox" checked={codActive} onChange={() => setCodActive(!codActive)} />
              <span className="slider"></span>
            </label>
          </div>
          
          <p style={{ color: '#64748b', margin: '15px 0', fontSize: '14px' }}>
            Allow customers to pay in cash when the order is delivered to their doorstep.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
            {codActive ? (
              <span className="badge delivered" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><CheckCircle size={14}/> Active</span>
            ) : (
              <span className="badge pending" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><XCircle size={14}/> Inactive</span>
            )}
          </div>
        </div>

        {/* 2. Bank Transfer */}
        <div className="box-card">
          <div className="box-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="stat-icon icon-blue" style={{ width: '40px', height: '40px' }}><Building size={20} /></div>
              <h2>Bank Transfer</h2>
            </div>
            
            {/* Toggle Switch */}
            <label className="switch">
              <input type="checkbox" checked={bankActive} onChange={() => setBankActive(!bankActive)} />
              <span className="slider"></span>
            </label>
          </div>

          <p style={{ color: '#64748b', margin: '15px 0', fontSize: '14px' }}>
            Customers can transfer money directly to your bank account. Provide your details below.
          </p>

          {/* Bank Details Form */}
          {bankActive && (
            <form onSubmit={handleSave} className="admin-form" style={{ marginTop: '15px' }}>
              <div className="form-row">
                <div className="form-group">
                  <label>Bank Name</label>
                  <input type="text" value={bankDetails.bankName} onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Account Title</label>
                  <input type="text" value={bankDetails.accountTitle} onChange={(e) => setBankDetails({...bankDetails, accountTitle: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Account Number / IBAN</label>
                <input type="text" value={bankDetails.iban} onChange={(e) => setBankDetails({...bankDetails, iban: e.target.value})} />
              </div>
              <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Save size={18} /> Save Bank Details
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
export default Payments;