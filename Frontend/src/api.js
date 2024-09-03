const API_URL = 'http://localhost:3001';

export const fetchIssues = async () => {
  const response = await fetch(`${API_URL}/issues`);
  return response.json();
};

export const createIssue = async (issue) => {
  const response = await fetch(`${API_URL}/issues`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(issue),
  });
  return response.json();
};

export const updateIssue = async (id, issue) => {
  const response = await fetch(`${API_URL}/issues/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(issue),
  });
  return response.json();
};

export const deleteIssue = async (id) => {
  await fetch(`${API_URL}/issues/${id}`, { method: 'DELETE' });
};