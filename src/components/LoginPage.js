import React from 'react';
import { FaHeadset, FaCogs, FaUsers } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate()
  const [ form, setForm ] = useState({email: '',password: ''})
  const [errorMessages, setErrorMessages] = useState({email: '', password: ''});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setErrorMessages(prev => ({ ...prev, [event.target.name]: '' })); 
    setForm(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true); 
    if (!form.email) {
      setErrorMessages(prev => ({ ...prev, email: 'Email is required' }));
      setIsSubmitting(false); 
      return;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      setErrorMessages(prev => ({ ...prev, email: 'Email is invalid' }));
      setIsSubmitting(false); 
      return;
    }
  
    if (!form.password) {
      setErrorMessages(prev => ({ ...prev, password: 'Password is required' }));
      setIsSubmitting(false); 
      return;
    }
  
    axios.post('/api/auth/login', form)
      .then(res => {
        const { token, isAdmin } = res.data; 
        localStorage.setItem('token', token);
        
        if (isAdmin) {
          navigate('/admin-dashboard'); 
        } else {
          navigate('/user-dashboard'); 
        }
      })
      .catch(err => {
        setErrorMessages({ email: 'Invalid email or password', password: 'Invalid email or password' });
        setIsSubmitting(false); 
      });
  };
  return (
    <div className="flex items-center justify-center h-screen text-gray-800" style={{ background: 'linear-gradient(90deg, #e6e9f0 0%, #eef1f5 100%)' }}>
      <div className="bg-white shadow-xl rounded-lg max-w-4xl mx-auto overflow-hidden flex">
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
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Client Support Login</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
          <InputField
            name="email"
            label="Your Email"
            type="email"
            id="email"
            placeholder="name@company.com"
            onChange={handleChange}
            errorMessage={errorMessages.email}
          />
          <InputField
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleChange}
            errorMessage={errorMessages.password}
          />
            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log in</button>
            <div className="text-sm font-medium text-gray-600 text-center">
              <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
              <span className="mx-1">|</span>
              <a href="register" className="text-blue-600 hover:underline">Sign up</a>
            </div>
          </form>
        </div>
      </div>
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

function InputField({ name, onChange, label, type, id, placeholder, errorMessage }) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
      <input name={name} onChange={onChange} type={type} id={id} className={`bg-gray-50 border ${errorMessage ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} placeholder={placeholder} required />
      {errorMessage && <p className="mt-1 text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
}

export default LoginPage;
