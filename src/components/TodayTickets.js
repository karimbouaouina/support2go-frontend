import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt, faPlus, faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

function TodayTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/tickets', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const today = new Date();
        const todayTickets = response.data.filter(ticket => {
          const createdDate = new Date(ticket.createdAt);
          return ticket.status === 'Open' &&
                 createdDate.getDate() === today.getDate() &&
                 createdDate.getMonth() === today.getMonth() &&
                 createdDate.getFullYear() === today.getFullYear();
        });
        setTickets(todayTickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };
  
    fetchTickets();
  }, [navigate]);

  
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

      <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">New Tickets Today</h3>
            <div className="mt-4">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Submitted</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {tickets.map((ticket) => (
                    <tr key={ticket._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ticket.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {ticket.status}
                    </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/admin-dashboard/${ticket._id}`} className="text-indigo-600 hover:text-indigo-900">View</Link>
                    </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>


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

export default TodayTicketsPage;