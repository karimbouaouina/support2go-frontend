import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import TicketSubmission from './components/TicketSubmission';
import TermsOfService from './components/TOSPage';
import FrequentlyAskedQuestions from './components/FAQPage';
import OpenTicketsPage from './components/OpenTickets';
import AdminTicketAssigned from './components/AdminTicketAssigned';
import AdminTicketReply from './components/AdminTicketReply';
import UserTicketAssigned from './components/UserTicketAssigned';
import UserTicketReply from './components/UserTicketReply';
import PendingTicketsPage from './components/PendingTickets';
import ResolvedTicketsPage from './components/ResolvedTickets';
import TodayTicketsPage from './components/TodayTickets';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/submit-ticket" element={<TicketSubmission />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/register/tos" element={<TermsOfService />} />
        <Route path="/faq" element={<FrequentlyAskedQuestions />} />
        <Route path="/admin-dashboard/opentickets/" element={<OpenTicketsPage />} />
        <Route path="/admin-dashboard/pendingtickets/" element={<PendingTicketsPage />} />
        <Route path="/admin-dashboard/resolvedtickets/" element={<ResolvedTicketsPage />} />
        <Route path="/admin-dashboard/newticketstoday/" element={<TodayTicketsPage />} />
        <Route path="/admin-dashboard/:id" element={<AdminTicketAssigned />} />
        <Route path="/admin-dashboard/:id/update" element={<AdminTicketReply />} />
        <Route path="/user-dashboard/:id/update" element={<UserTicketReply />} />
        <Route path="/user-dashboard/:id" element={<UserTicketAssigned />} />
      </Routes>
    </Router>
  );
}

export default App;
