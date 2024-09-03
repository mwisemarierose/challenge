import React, { useState, useEffect } from 'react';
import { fetchIssues, createIssue, updateIssue, deleteIssue } from './api';
import './App.css';

function App() {
  const [issues, setIssues] = useState([]);
  const [newIssue, setNewIssue] = useState({ title: '', description: '' });
  const [editingIssue, setEditingIssue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    const data = await fetchIssues();
    setIssues(data);
  };

  const handleCreateIssue = async (e) => {
    e.preventDefault();
    await createIssue(newIssue);
    setNewIssue({ title: '', description: '' });
    loadIssues();
  };

  const handleUpdateIssue = async (e) => {
    e.preventDefault();
    await updateIssue(editingIssue.id, editingIssue);
    setIsModalOpen(false);
    setEditingIssue(null);
    loadIssues();
  };

  const handleDeleteIssue = async (id) => {
    await deleteIssue(id);
    loadIssues();
  };

  const openEditModal = (issue) => {
    setEditingIssue(issue);
    setIsModalOpen(true);
  };

  return (
    <div className="App">
      <h1>Issue Tracker</h1>
      <form onSubmit={handleCreateIssue}>
        <input
          type="text"
          value={newIssue.title}
          onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
          placeholder="Title"
          required
        />
        <input
          type="text"
          value={newIssue.description}
          onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
          placeholder="Description"
          required
        />
        <button type="submit">Create Issue</button>
      </form>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <span>{issue.title} - {issue.description}</span>
            <div>
              <button onClick={() => openEditModal(issue)}>Edit</button>
              <button onClick={() => handleDeleteIssue(issue.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Issue</h2>
            <form onSubmit={handleUpdateIssue}>
              <input
                type="text"
                value={editingIssue.title}
                onChange={(e) => setEditingIssue({ ...editingIssue, title: e.target.value })}
                placeholder="Title"
                required
              />
              <input
                type="text"
                value={editingIssue.description}
                onChange={(e) => setEditingIssue({ ...editingIssue, description: e.target.value })}
                placeholder="Description"
                required
              />
              <button type="submit">Update Issue</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;