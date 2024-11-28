import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import Header from './components/Header';
import './App.css';

const App = () => {
  const users = [
    "Alice", "Bob", "Charlie", "David", "Swift", "Brave", "Happy", "Clever", "Jolly",
    "Witty", "Bright", "Charming", "Dashing", "Merry"
  ];

  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (selectedUser) {
      const storedMessages = JSON.parse(localStorage.getItem(`chat_${selectedUser}`)) || [];
      setMessages(storedMessages);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem(`chat_${selectedUser}`, JSON.stringify(messages));
    }
  }, [messages, selectedUser]);

  const handleUserClick = (user) => setSelectedUser(user);
  const clearSelectedUser = () => setSelectedUser(null); // Reset selected user when back button is clicked

  return (
    <div className="app">
      <Header selectedUser={selectedUser} />
      <div className="container">
        <Sidebar users={users} selectedUser={selectedUser} onUserClick={handleUserClick} />
        <ChatArea
          selectedUser={selectedUser}
          messages={messages}
          setMessages={setMessages}
          onBackClick={clearSelectedUser} // Pass back click handler to reset state
        />
      </div>
    </div>
  );
};

export default App;