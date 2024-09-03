import { jest } from '@jest/globals';
import fs from 'fs/promises';

// Mock fs module
jest.mock('fs/promises');

let issueController;

beforeAll(async () => {
  issueController = await import('../controllers/issueController.js');
});

describe('Issue Controller', () => {
  let mockRequest;
  let mockResponse;
  let mockIssues;

  beforeEach(() => {
    mockRequest = {
      params: {},
      body: {}
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    mockIssues = [
      { id: 1, title: 'Issue 1', description: 'Description 1' },
      { id: 2, title: 'Issue 2', description: 'Description 2' }
    ];
    fs.readFile.mockResolvedValue(JSON.stringify(mockIssues));
  });

  describe('getAllIssues', () => {
    it('should return all issues', async () => {
      await issueController.getAllIssues(mockRequest, mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith(mockIssues);
    });

    it('should handle errors', async () => {
      fs.readFile.mockRejectedValue(new Error('Read error'));
      await issueController.getAllIssues(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalledWith('Error reading issues');
    });
  });

  describe('getIssueById', () => {
    it('should return an issue if it exists', async () => {
      mockRequest.params.id = '1';
      await issueController.getIssueById(mockRequest, mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith(mockIssues[0]);
    });

    it('should return 404 if issue does not exist', async () => {
      mockRequest.params.id = '3';
      await issueController.getIssueById(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.send).toHaveBeenCalledWith('Issue not found');
    });
  });

  // ... rest of the tests ...
});