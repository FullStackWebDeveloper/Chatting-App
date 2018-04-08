import Room from '../models/room';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

export function getRooms(req, res) {
  console.log(req)
  if(req.query.workspace_title) {
    Room.find({workspace_title: req.query.workspace_title}).sort('-created_at').exec((err, rooms) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ rooms });
    });
  } else {
    res.json([]);
  }
}

export function addRoom(req, res) {
  if (!req.body.room.owner || !req.body.room.members || !req.body.room.title) {
    res.status(403).end();
  }

  const newRoom = new Room(req.body.room);

  // Let's sanitize inputs
  newRoom.title = sanitizeHtml(newRoom.title);
  newRoom.owner = sanitizeHtml(newRoom.owner);
  newRoom.type = sanitizeHtml(newRoom.type);
  newRoom.workspace_title = sanitizeHtml(newRoom.workspace_title);
  newRoom.channel_id = cuid();
  
  newRoom.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ room: saved });
  });
}

export function getRoom(req, res) {
  Room.findOne({ channel_id: req.params.channel_id }).exec((err, room) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ room });
  });
}

export function deleteRoom(req, res) {
  Room.findOne({ channel_id: req.params.channel_id }).exec((err, room) => {
    if (err) {
      res.status(500).send(err);
    }

    room.remove(() => {
      res.status(200).end();
    });
  });
}
