import React, { useState } from "react";
import './Sidebar.css';
import { IoMdContact } from "react-icons/io";
const Sidebar = ({ users, selectedUser, onUserClick }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Chats</h2>
      <input
        type="text"
        className="search-input"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="user-list">
        {filteredUsers.map((user) => (
          <li
            key={user}
            className={`user-item ${selectedUser === user ? "active" : "inactive"}`}
            onClick={() => onUserClick(user)}
          >
            <IoMdContact className="avatar-icon" />
            <span className="user-name">{user}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;