'use client';

import { useState } from 'react';
import Link from 'next/link';

interface LoginProps {
  onSubmit?: (data: { username: string; password: string; rememberMe: boolean }) => void;
}

export default function Login({ onSubmit }: LoginProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    form: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ username: '', password: '', form: '' });

    // Basic validation
    const newErrors = { username: '', password: '', form: '' };
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username or email is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (newErrors.username || newErrors.password) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // If onSubmit prop is provided, use it (for testing)
    if (onSubmit) {
      onSubmit(formData);
    } else {
      // Default behavior - just log for now
      console.log('Login attempt:', formData);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        alert('Login form submitted! (This is just a test)');
      }, 1000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your Youth Startup Forum account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username or Email</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username or email"
              className={errors.username ? 'error' : ''}
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>
          
          <div className="form-options">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            <Link href="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
          
          <button type="submit" className="login-btn" disabled={isLoading}>
            <span className="btn-text" style={{ display: isLoading ? 'none' : 'inline' }}>
              Sign In
            </span>
            <span className="btn-loader" style={{ display: isLoading ? 'inline' : 'none' }}>
              Signing in...
            </span>
          </button>
          
          {errors.form && (
            <div className="form-error">
              {errors.form}
            </div>
          )}
        </form>
        
        <div className="login-footer">
          <p>
            Don't have an account? 
            <Link href="/register"> Create one here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}