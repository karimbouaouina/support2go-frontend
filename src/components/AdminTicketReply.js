import React, { useState, useEffect } from 'react';
import { FaPaperPlane, FaTicketAlt, FaUserCircle, FaPencilAlt, FaTimesCircle, FaCommentAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt, faPencilAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AdminTicketReply() {
    const token = localStorage.getItem('token');
    const [response, setResponse] = useState('');
    const [ticket, setTicket] = useState(null);
    const [comments, setComments] = useState([]);
    const { id } = useParams(); 

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            axios.get(`/api/tickets/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                setTicket(response.data);
                setComments(response.data.comments);
            })
            .catch(error => {
                console.error('Error fetching ticket details:', error);
                navigate('/login');
            });
        }
    }, [id, navigate, token]);

    const handleSendReply = async (e) => {
      e.preventDefault();
      const config = {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
      };
  
      const body = JSON.stringify({ comment: response, status: 'Pending' });
  
      try {
          const res = await axios.post(`/api/tickets/${id}/comments`, body, config);
          console.log(res.data);
          setComments([...comments, res.data.comments.pop()]);
          navigate(`/admin-dashboard/${id}`);
          setResponse('');
          const statusUpdateRes = await axios.put(`/api/tickets/${id}/status`, { status: 'Pending' }, config);
          setTicket({ ...ticket, status: 'Pending' });
          navigate('/admin-dashboard/');
      } catch (error) {
          console.error('Error sending reply or updating status:', error?.response?.data);
      }
  };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    const handleDashboardClick = () => {
      if (token) {
          navigate('/admin-dashboard'); 
      } else {
          navigate('/login');
      }
    };

    if (!ticket) return null


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

      <main className="container mx-auto px-4 py-10">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-t-8 border-blue-500">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-blue-600">Ticket #{ticket._id}</h1>
                        <p className="text-sm text-gray-500">Submitted on {new Date(ticket.createdAt).toLocaleDateString()}</p>
                    </div>

                    <form onSubmit={handleSendReply}>
                        <div className="mb-4">
                            <label htmlFor="response" className="block text-gray-700 text-sm font-bold mb-2">Your Response:</label>
                            <textarea
                                id="response"
                                rows="5"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                                placeholder="Type your message here..."
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end items-center">
                            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 flex items-center">
                                <FaPaperPlane className="mr-2" />Send Reply
                            </button>
                        </div>
                    </form>
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

export default AdminTicketReply;
