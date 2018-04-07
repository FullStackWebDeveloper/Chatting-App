import { Router } from 'express';
import * as WorkspaceController from '../controllers/workspace.controller';
const router = new Router();

// Get all Workspaces
router.route('/workspaces').get(WorkspaceController.getWorkspaces);

// Get one Workspace by cuid
router.route('/workspaces/:cuid').get(WorkspaceController.getWorkspace);

// Add a new Workspace
router.route('/workspaces').post(WorkspaceController.addWorkspace);

// Delete a Workspace by cuid
router.route('/workspaces/:cuid').delete(WorkspaceController.deleteWorkspace);

export default router;
