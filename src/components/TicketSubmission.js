import React, { useState } from 'react';
import axios from 'axios';
import { FaTicketAlt, FaInfoCircle, FaExclamationTriangle, FaEnvelopeOpenText } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function TicketSubmission() {
  const [ticketData, setTicketData] = useState({
    title: '',
    description: '',
    category: 'Technical', 
    priority: 'Low',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTicketData({ ...ticketData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!ticketData.title) newErrors.title = 'Title is required';
    if (!ticketData.description) newErrors.description = 'Description is required';
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return; 

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    };

    try {
      await axios.post('/api/tickets', ticketData, config);
      setTicketData({ title: '', description: '', category: 'Technical', priority: 'Low' });
      navigate('/user-dashboard');
    } catch (error) {
      console.error('Error submitting ticket:', error.response?.data);
      alert('Failed to submit ticket. Please check the form for errors.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 space-y-5">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4 flex items-center justify-center">
          <FaTicketAlt className="mr-2"/>
          Submit a Support Ticket
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          <InputField
            id="title"
            name="title"
            type="text"
            label="Title"
            icon={<FaInfoCircle />}
            value={ticketData.title}
            onChange={handleChange}
            error={errors.title}
          />
          <InputField
            id="description"
            name="description"
            type="textarea"
            label="Description"
            icon={<FaEnvelopeOpenText />}
            value={ticketData.description}
            onChange={handleChange}
            error={errors.description}
          />
          <InputField
            id="category"
            name="category"
            type="select"
            label="Category"
            icon={<FaExclamationTriangle />}
            options={['Technical', 'Billing', 'General Query', 'Feedback', 'Other']}
            value={ticketData.category}
            onChange={handleChange}
          />
          <InputField
            id="priority"
            name="priority"
            type="select"
            label="Priority"
            icon={<FaExclamationTriangle />}
            options={['Low', 'Medium', 'High', 'Urgent']}
            value={ticketData.priority}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );
}

function InputField({ id, name, type, label, icon, options, value, onChange, error }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
        {icon}
        <span className="ml-2">{label}</span>
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          rows="4"
          value={value}
          onChange={onChange}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
          required
        ></textarea>
      ) : type === 'select' ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
          required
        />
      )}
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
}

export default TicketSubmission;