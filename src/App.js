// App.js
import React, { useState, useEffect } from 'react';
import KanbanBoard from './KanbanBoard'; // Make sure to have this import
import './App.css'; // Ensure you import the updated CSS

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority');

  useEffect(() => {
    // Fetch tickets from API
    console.log("Fetching tickets...");
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.tickets)) {
          setTickets(data.tickets); // Update state with the tickets array
          console.log("Fetched tickets data:", data.tickets); // Log fetched data
        } else {
          console.error("Unexpected data structure:", data); // Log unexpected data structure
        }
        setUsers(data.users); // Store users data
      })
      .catch(error => {
        console.error("Error fetching tickets:", error); // Log any errors
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  return (
    <div className="App">
      <header className="app-header"> {/* Updated header with new class */}
        Karbon Board
      </header>
      <div className="controls"> {/* Moved controls here */}
        <label>Group by:</label>
        <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>

        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
      {/* New wrapper for the Kanban board */}
      <div className="kanban-board-container">
        <KanbanBoard tickets={tickets} users={users} groupBy={groupBy} sortBy={sortBy} />
      </div>
    </div>
  );
};

export default App;
