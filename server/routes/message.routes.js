import { Router } from 'express';
import * as MessageController from '../controllers/message.controller';
const router = new Router();

// Get all Messages
router.route('/messages:channel_id').get(MessageController.getMessages);
// Add a new Message
router.route('/messages').post(MessageController.addMessage);

// Delete a message by cuid
router.route('/messages/:cuid').delete(MessageController.deleteMessage);

export default router;
