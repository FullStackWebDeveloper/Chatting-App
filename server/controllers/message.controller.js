import Message from "../models/message";
import cuid from "cuid";
import slug from "limax";
import sanitizeHtml from "sanitize-html";

export function getMessages(req, res) {
  // {created_date:{$gte: new Date().setDate(new Date().getDate()-7)}}
  Message.find({channel_id: req.query.channel_id}).sort("created_at").exec((err, messages) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ messages });
  });
}

export function addMessage(req, res) {
  if (
    !req.body.message.author ||
    !req.body.message.channel_id ||
    !req.body.message.markdown
  ) {
    res.status(403).end();
  }

  const newMessage = new Message(req.body.message);

  // Let's sanitize inputs
  newMessage.author = sanitizeHtml(newMessage.author);
  newMessage.channel_id = sanitizeHtml(newMessage.channel_id);
  newMessage.markdown = sanitizeHtml(newMessage.markdown);
  newMessage.message_id = cuid();
  newMessage.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: saved });
    }
  });
}

export function deleteMessage(req, res) {
  Message.findOne({
    message_id: req.params.message_id
  }).exec((err, message) => {
    if (err) {
      res.status(500).send(err);
    }

    message.remove(() => {
      res.status(200).end();
    });
  });
}
