// TicketCard.js
import React from 'react';
import './TicketCard.css';

// Mapping priority numbers to names
const priorityNames = {
  0: 'No Priority',
  1: 'Low',
  2: 'Medium',
  3: 'High',
  4: 'Urgent',
};

const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-title">{ticket.title}</div>
      <div className="ticket-meta">
        <span className={`priority-label priority-${ticket.priority}`}>
          {priorityNames[ticket.priority]} {/* Displaying priority name */}
        </span>
        <span>User: {ticket.userId}</span>
      </div>
      <div>Status: {ticket.status}</div>
    </div>
  );
};

export default TicketCard;
