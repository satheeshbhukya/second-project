// KanbanBoard.js
import React from 'react';
import TicketCard from './TicketCard'; // Ensure you have this import
import './KanbanBoard.css';

// Mapping priority numbers to names
const priorityNames = {
  0: 'No Priority',
  1: 'Low',
  2: 'Medium',
  3: 'High',
  4: 'Urgent',
};

// Group tickets by the specified category
const groupByCategory = (tickets, groupBy) => {
  const groups = {};

  tickets.forEach(ticket => {
    const key = groupBy === 'user' ? ticket.userId : ticket[groupBy];
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(ticket);
  });

  return groups;
};

// Sort tickets based on specified criteria
const sortTickets = (tickets, sortBy) => {
  if (sortBy === 'priority') {
    return tickets.sort((a, b) => b.priority - a.priority);
  }
  return tickets.sort((a, b) => a.title.localeCompare(b.title));
};

const KanbanBoard = ({ tickets, users, groupBy, sortBy }) => {
  const groupedTickets = groupByCategory(tickets, groupBy);

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map(group => {
        // Find the user object if grouping by user
        const groupName =
          groupBy === 'user'
            ? users.find(user => user.id === group)?.name || group
            : groupBy === 'priority'
            ? priorityNames[group] // Use the priority name if grouping by priority
            : group;

        return (
          <div key={group} className="kanban-column">
            <h2>{groupName}</h2>
            {sortTickets(groupedTickets[group], sortBy).map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
