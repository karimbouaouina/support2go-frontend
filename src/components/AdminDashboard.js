import React, { useEffect } from 'react';
import { FaTicketAlt, FaEnvelopeOpenText, FaTasks, FaCheckCircle, FaPlusCircle } from 'react-icons/fa';
import { faTicketAlt, faPlus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
  const stats = [
    { icon: FaEnvelopeOpenText, title: "Open Tickets", count: 1, color: "bg-blue-500", path: '/admin-dashboard/opentickets' },
    { icon: FaTasks, title: "Pending Tickets", count: 0, color: "bg-yellow-500", path: '/admin-dashboard/pendingtickets' },
    { icon: FaCheckCircle, title: "Resolved Tickets", count: 0, color: "bg-green-500", path: '/admin-dashboard/resolvedtickets' },
    { icon: FaPlusCircle, title: "New Tickets Today", count: 1, color: "bg-indigo-500", path: '/admin-dashboard/newticketstoday' },
  ];
  useEffect(() => {
    function getStats() {
    const token = localStorage.getItem('token');
    axios.get('/api/tickets/stats', {
        headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
        console.log('Data:', response.data);
    }).catch((error) => {
        console.error('Error fetching stats:', error);
    });
}
  getStats()
  },[])

  const handleStatClick = (path) => {
    navigate(path);
  };

  const activities = [
    { id: 1, message: "Ticket #66201267d7ec2cc0924be914 was resolved by Karim", date: "Apr 17, 2024" }
  ];

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleDashboardClick = () => {
    if (token) {
        navigate('/admin-dashboard'); 
    } else {
        navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    console.log('Logout');
  };

  return (
    <><div className="bg-blue-50 min-h-screen">
      <nav className="bg-white text-black py-4 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <Link to="/" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                <FontAwesomeIcon icon={faTicketAlt} className="text-blue-500 mr-2" />
                <span className="font-bold">Support2Go</span>
              </Link>
              <div className="hidden md:flex items-center space-x-1">
                <a href="/" className="py-5 px-3 text-gray-700 hover:text-gray-900">Home</a>
                <a href="/" className="py-5 px-3 text-gray-700 hover:text-gray-900">About Us</a>
                <a href="/" className="py-5 px-3 text-gray-700 hover:text-gray-900">Feedback</a>
                <a href="/faq" className="py-5 px-3 text-gray-700 hover:text-gray-900">FAQ</a>
                <a href="#" onClick={handleDashboardClick} className="py-5 px-3 text-gray-700 hover:text-gray-900">Dashboard</a>
              </div>
            </div>
            {token && (
              <div className="hidden md:flex items-center space-x-1">
                <Link onClick={handleLogout} to="/login" className="py-3 px-6 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300">Logout</Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, title, count, color, path }, index) => (
            <div
              key={index}
              className="bg-white overflow-hidden shadow rounded-lg transform transition duration-300 hover:scale-105 cursor-pointer"
              onClick={() => handleStatClick(path)}
            >
              <div className="px-4 py-5 sm:p-6 flex items-center">
                <div className={`flex-shrink-0 ${color} rounded-md p-3`}>
                  <Icon className="text-white text-lg" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">{count}</dd>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
            <div className="mt-6 flow-root">
              <ul className="-mb-8">
                {activities.map((activity, index) => (
                  <li key={index}>
                    <div className="relative pb-8">
                      {index !== activities.length - 1 ? (<span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                            <FaCheckCircle className="text-white" size="20px" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">{activity.message}</p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <time dateTime={activity.date}>{activity.date}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div><div>
        <footer className="bg-blue-600 text-white py-8">
          <div className="container mx-auto px-6 text-center">
            <div className="flex justify-center mb-4 space-x-4">
              <a href="/register/tos" className="hover:underline text-sm">Terms of Service</a>
              <span className="text-sm">|</span>
              <a href="#" className="hover:underline text-sm">Privacy Policy</a>
              <span className="text-sm">|</span>
              <a href="#" className="hover:underline text-sm">Cookie Policy</a>
              <span className="text-sm">|</span>
              <a href="#" className="hover:underline text-sm">Help Center</a>
            </div>
            <p className="text-sm">&copy; 2024 Support2Go. All rights reserved.</p>
            <p className="text-sm">Designed by Karim Bouaouina</p>
          </div>
        </footer>
      </div></>
  );
}

export default AdminDashboard;
