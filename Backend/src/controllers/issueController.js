import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../data/issues.json');

const readIssues = async () => {
  const data = await fs.readFile(dataPath, 'utf8');
  return JSON.parse(data);
};

const writeIssues = async (issues) => {
  await fs.writeFile(dataPath, JSON.stringify(issues, null, 2));
};

export const getAllIssues = async (req, res) => {
  try {
    const issues = await readIssues();
    res.json(issues);
  } catch (error) {
    res.status(500).send('Error reading issues');
  }
};

export const getIssueById = async (req, res) => {
  try {
    const issues = await readIssues();
    const issue = issues.find(i => i.id === parseInt(req.params.id));
    if (issue) {
      res.json(issue);
    } else {
      res.status(404).send('Issue not found');
    }
  } catch (error) {
    res.status(500).send('Error reading issue');
  }
};

export const createIssue = async (req, res) => {
  try {
    const issues = await readIssues();
    const newIssue = {
      id: issues.length + 1,
      ...req.body
    };
    issues.push(newIssue);
    await writeIssues(issues);
    res.status(201).json(newIssue);
  } catch (error) {
    res.status(500).send('Error creating issue');
  }
};

export const updateIssue = async (req, res) => {
  try {
    const issues = await readIssues();
    const index = issues.findIndex(i => i.id === parseInt(req.params.id));
    if (index !== -1) {
      issues[index] = { ...issues[index], ...req.body };
      await writeIssues(issues);
      res.json(issues[index]);
    } else {
      res.status(404).send('Issue not found');
    }
  } catch (error) {
    res.status(500).send('Error updating issue');
  }
};

export const deleteIssue = async (req, res) => {
  try {
    const issues = await readIssues();
    const index = issues.findIndex(i => i.id === parseInt(req.params.id));
    if (index !== -1) {
      const [deletedIssue] = issues.splice(index, 1);
      await writeIssues(issues);
      res.json(deletedIssue);
    } else {
      res.status(404).send('Issue not found');
    }
  } catch (error) {
    res.status(500).send('Error deleting issue');
  }
};