import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { Lock, Mail, Eye, EyeOff, CheckCircle, MailCheck } from 'lucide-react';
import './SignIn.css';

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignedUp, setIsSignedUp] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Check karein agar user email verify karke wapas aya hai
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('verified') === 'true') {
      setSuccessMsg('Email Verified Successfully! You can now log in.');
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const { data } = await API.post(endpoint, formData);
      
      if (isLogin) {
        login(data); // User save karein
        
        // ✅ Yahan Check hai: Agar Admin hai toh /admin par bhejein
        if (data.role === 'admin') {
          navigate('/admin'); 
        } else {
          navigate('/'); 
        }
      } else {
        // Sign Up successful
        setIsSignedUp(true); 
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="signin-page-container">
      {/* Left Side - Black Box */}
      <div className="signin-left">
        <div className="signin-brand">
          <h1>TTS</h1>
          <span>COLLECTION</span>
        </div>
        
        <div className="signin-left-content">
          {isSignedUp ? (
            <>
              <h2>Join the <br/><span>quiet luxury</span></h2>
              <p>Create your account and unlock a world of thoughtfully crafted essentials, exclusive drops, and member-only pricing.</p>
              <ul className="signin-features">
                <li><CheckCircle size={18} /> Save your favourite pieces</li>
                <li><CheckCircle size={18} /> Faster checkout, every time</li>
                <li><CheckCircle size={18} /> Track orders from studio to door</li>
                <li><CheckCircle size={18} /> Be first to every new drop</li>
              </ul>
            </>
          ) : (
            <>
              <h2>Welcome <span>back</span></h2>
              <p>Sign in to your account to access your orders, wishlist and exclusive offers.</p>
              <ul className="signin-features">
                <li><CheckCircle size={18} /> Track your orders in real time</li>
                <li><CheckCircle size={18} /> Save your favourite products</li>
                <li><CheckCircle size={18} /> Faster checkout</li>
              </ul>
            </>
          )}
        </div>
        
        <div className="signin-footer">
          <p>© 2026 TTS Collection</p>
        </div>
      </div>

      {/* Right Side - Forms */}
      <div className="signin-right">
        <div className="signin-form-wrapper">
          
          {isSignedUp ? (
            <div className="verification-screen">
              <div className="icon-wrapper">
                <MailCheck size={45} color="#f05a28" />
              </div>
              <h2>Check your inbox</h2>
              <p className="verify-text">We've sent a verification link to</p>
              <p className="verify-email">{formData.email}</p>
              <p className="verify-desc">
                Click the link in the email to verify your account. If you don't see it, check your spam folder.
              </p>
              <button 
                className="signin-submit-btn" 
                onClick={() => alert('Verification email resent to ' + formData.email)}
              >
                Resend verification email
              </button>
              <button 
                className="btn-outline" 
                onClick={() => { setIsSignedUp(false); setIsLogin(true); }}
              >
                Back to Sign In
              </button>
              <p className="toggle-auth" style={{ marginTop: '20px' }}>
                Already verified? <span onClick={() => { setIsSignedUp(false); setIsLogin(true); }}>Sign in here</span>
              </p>
            </div>
          ) : (
            <>
              <p className="form-tag">{isLogin ? 'Sign In' : 'Sign Up'}</p>
              <h2>{isLogin ? 'Welcome Back' : 'Join the quiet luxury'}</h2>
              <p className="form-desc">{isLogin ? 'Enter your credentials to continue' : 'Create an account to get started.'}</p>
              
              {successMsg && <div className="success-alert">{successMsg}</div>}
              {error && <div className="error-alert">{error}</div>}

              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="form-group">
                    <label>FULL NAME</label>
                    <div className="input-icon-wrapper">
                      <input 
                        type="text" 
                        placeholder="Jane Doe" 
                        required 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                      />
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label>EMAIL ADDRESS</label>
                  <div className="input-icon-wrapper">
                    <Mail size={18} className="input-icon" />
                    <input 
                      type="email" 
                      placeholder="you@example.com" 
                      required 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="label-row">
                    <label>PASSWORD</label>
                    {isLogin && <a href="/" className="forgot-link">Forgot password?</a>}
                  </div>
                  <div className="input-icon-wrapper">
                    <Lock size={18} className="input-icon" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      required 
                      onChange={(e) => setFormData({...formData, password: e.target.value})} 
                    />
                    <button 
                      type="button" 
                      className="toggle-password" 
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="form-options">
                  <label className="remember-me">
                    <input type="checkbox" defaultChecked /> Remember me
                  </label>
                </div>
                
                <button type="submit" className="signin-submit-btn">
                  <Lock size={18} /> {isLogin ? 'Sign In' : 'Sign Up'}
                </button>
              </form>

              <div className="toggle-auth">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <span onClick={() => { setIsLogin(!isLogin); setError(''); }}>
                  {isLogin ? 'Create one' : 'Sign In'}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;