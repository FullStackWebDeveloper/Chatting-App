import { Router } from 'express';
import * as RoomController from '../controllers/room.controller';
const router = new Router();

// Get all Rooms
router.route('/rooms').get(RoomController.getRooms);

// Get one room by cuid
router.route('/rooms/:cuid').get(RoomController.getRoom);

// Add a new Room
router.route('/rooms').post(RoomController.addRoom);

// Delete a room by cuid
router.route('/rooms/:cuid').delete(RoomController.deleteRoom);

export default router;
