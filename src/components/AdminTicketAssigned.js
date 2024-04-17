import React, { useState, useEffect } from 'react';
import { FaTicketAlt, FaUserCircle, FaPencilAlt, FaTimesCircle, FaCommentAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt, faPencilAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from '../AdminTicketAssigned.module.css'
function AdminTicketAssigned() {
    const token = localStorage.getItem('token');
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleUpdateClick = () => {
      navigate(`/admin-dashboard/${id}/update`);
  };
  const handleDashboardClick = () => {
    if (token) {
        navigate('/admin-dashboard'); 
    } else {
        navigate('/login');
    }
  };

    const handleCloseTicket = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
  
      const body = JSON.stringify({ status: 'Resolved' });
  
      try {
        await axios.put(`/api/tickets/${id}/resolved`, body, config);
        setTicket({ ...ticket, status: 'Resolved' });
      } catch (error) {
        console.error('Error resolving ticket:', error?.response?.data);
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
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="mb-4">
            <h1 className="text-2xl font-bold text-blue-600">Ticket #{ticket._id}</h1>
            <p className="text-sm text-gray-500">Category: {ticket.category} - Priority: {ticket.priority}</p>
            <p className="text-sm text-gray-500">Submitted on {new Date(ticket.createdAt).toLocaleDateString()} - Status: <span className={`${ticket.status === 'Open' || ticket.status === 'Resolved' ? 'text-green-500' : 'text-red-500'}`}>{ticket.status}</span></p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Issue: {ticket.title}</h2>
            <p className={`${styles.customDescriptionClass} text-gray-600 mt-2 break-words`}>{ticket.description}</p>
          </div>

          <div className="mb-4">
          </div>

              {ticket.status !== 'Closed' && ticket.status !== 'Resolved' && (
                <div className="flex justify-between items-center">
    <div className="flex items-center space-x-2 text-gray-600">
    <FaUserCircle className="text-lg" />
    <span>Submitted by: <span className="font-semibold">{ticket.submitter}</span></span>
    </div>
    <div className="flex items-center space-x-2">
      <button onClick={handleUpdateClick} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 flex items-center">
        <FontAwesomeIcon icon={faPencilAlt} className="mr-2" /> Update Ticket
      </button>
      <button onClick={handleCloseTicket} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 flex items-center">
        <FontAwesomeIcon icon={faTimesCircle} className="mr-2" /> Close Ticket
      </button>
    </div>
  </div>
)}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Ticket History</h2>
          {comments.map((comment, index) => (
            <div key={index} className={styles.ticketHistoryItem}>
            <div className={styles.commentIcon}>
              <FaCommentAlt className="text-blue-500 text-lg mt-1" />
            </div>
            <div className={styles.ticketComment}>
              <p className={styles.commentDate}>Commented on {new Date(comment.commentedAt).toLocaleDateString()}</p>
              <p className={styles.commentText}>{comment.text}</p>
            </div>
          </div>
))}
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

export default AdminTicketAssigned;
