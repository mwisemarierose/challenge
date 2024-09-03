import React, { useState, useEffect } from 'react';
import { fetchIssues, createIssue, updateIssue, deleteIssue } from './api';
import './App.css';

function App() {
  const [issues, setIssues] = useState([]);
  const [newIssue, setNewIssue] = useState({ title: '', description: '' });

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

  const handleUpdateIssue = async (id, updatedIssue) => {
    await updateIssue(id, updatedIssue);
    loadIssues();
  };

  const handleDeleteIssue = async (id) => {
    await deleteIssue(id);
    loadIssues();
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
            {issue.title} - {issue.description}
            <button onClick={() => handleUpdateIssue(issue.id, { ...issue, title: `${issue.title} (updated)` })}>
              Update
            </button>
            <button onClick={() => handleDeleteIssue(issue.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;