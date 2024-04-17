import React, { useState } from 'react';
import { FaHeadset, FaCogs, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
    const navigate = useNavigate()
    const [errorMessages, setErrorMessages] = useState({});
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        terms: false,
    });

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
      setErrorMessages(prevErrorMessages => ({ ...prevErrorMessages, [name]: '' }));
    };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
  
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
      formIsValid = false;
    } else if (formData.username.length > 50) {
      errors.username = 'Username is too long';
      formIsValid = false;
    }
  
    if (!formData.email) {
      errors.email = 'Email is required';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      formIsValid = false;
    }
  
    if (!formData.password) {
      errors.password = 'Password is required';
      formIsValid = false;
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
      formIsValid = false;
    }
  
    if (!formData.terms) {
      errors.terms = 'You must accept the Terms of Service';
      formIsValid = false;
    }
  
    setErrorMessages(errors);
    return formIsValid;
  };

const handleSubmit = (event) => {
  event.preventDefault();
  if (!validateForm()) return; 

  console.log('Registration form submitted with:', formData);
  axios.post('/api/auth/register', formData).then(res => {
      const token = res.data.token;
      localStorage.setItem('token', token);
      navigate('/user-dashboard');
  }).catch(err => {
      console.error(err);
      if (err.response && err.response.data) {
          setErrorMessages(prev => ({ ...prev, ...err.response.data.errors }));
      }
  });
};

    return (
        <div className="flex items-center justify-center h-screen text-gray-800" style={{ background: 'linear-gradient(90deg, #e6e9f0 0%, #eef1f5 100%)' }}>
            <div className="bg-white shadow-xl rounded-lg max-w-4xl mx-auto overflow-hidden flex flex-wrap md:flex-nowrap">
            <div className="hidden lg:block lg:w-1/2 bg-blue-600 p-8">
          <h2 className="text-3xl font-bold mb-8 text-white">Welcome to Our Support Services</h2>
          <div className="space-y-4">
            <ServiceFeature
              Icon={FaHeadset}
              title="24/7 Support"
              description="Get help anytime"
            />
            <ServiceFeature
              Icon={FaCogs}
              title="Technical Help"
              description="Expert technical assistance"
            />
            <ServiceFeature
              Icon={FaUsers}
              title="User Community"
              description="Join discussions and share knowledge"
            />
          </div>
        </div>
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Create Your Account</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                    <InputField
                label="Username"
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                handleChange={handleChange}
                errorMessage={errorMessages.username}
            />
            <InputField
                label="Email Address"
                name="email"
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                handleChange={handleChange}
                errorMessage={errorMessages.email}
            />
            <InputField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                handleChange={handleChange}
                errorMessage={errorMessages.password}
            />
                        <div className="flex items-center">
                            <input id="terms" name="terms" type="checkbox" checked={formData.terms} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" required />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">I accept the <Link to="tos" className="text-blue-600 hover:underline">Terms of Service</Link></label>
                        </div>
                        <button type="submit" className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${!formData.terms ? 'disabled:opacity-50' : ''}`} disabled={!formData.terms}>Register</button>
                        <div className="text-sm font-medium text-gray-600 text-center">
                            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function Feature({ icon: Icon, title, description }) {
    return (
        <div className="flex items-center">
            <div className="p-3 bg-blue-500 rounded-full">
                <Icon className="fa-lg text-white" />
            </div>
            <div className="ml-4">
                <p className="font-semibold">{title}</p>
                <p className="text-sm">{description}</p>
            </div>
        </div>
    );
}

function InputField({ label, name, type, placeholder, value, handleChange, errorMessage }) {
  return (
    <div>
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        className={`bg-gray-50 border ${errorMessage ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        
      />
      {errorMessage && <p className="mt-1 text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
}
function ServiceFeature({ Icon, title, description }) {
    return (
      <div className="flex items-center text-white">
        <div className="p-3 bg-blue-500 rounded-full">
          <Icon className="fa-lg" />
        </div>
        <div className="ml-4">
          <p className="font-semibold">{title}</p>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    );
  }

export default RegisterPage;
