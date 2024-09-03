import express from 'express';
import * as issueController from '../controllers/issueController.js';

const router = express.Router();

router.get('/', issueController.getAllIssues);
router.get('/:id', issueController.getIssueById);
router.post('/', issueController.createIssue);
router.put('/:id', issueController.updateIssue);
router.delete('/:id', issueController.deleteIssue);

export default router;