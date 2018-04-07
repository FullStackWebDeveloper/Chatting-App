import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messagesSchema = new Schema({
  author: { type: 'String', required: true },
  channel_id: { type: 'String', required: true },
  message_id: { type: 'String', required: true },
  created_at: { type: 'Date', default: Date.now, required: true },
  markdown: { type: 'String', required: true },
  type: { type: 'String', default: 'chat', required: true }
});

export default mongoose.model('Messages', messagesSchema);
