import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const roomsSchema = new Schema({
  channel_id: { type: 'String', required: true },
  owner: { type: 'String', required: true },
  members: { type: ['String'] },
  created_at: { type: 'Date', default: Date.now, required: true },
  title: { type: 'String', required: true },
  type: { type: 'String', required: true },
  workspace_title: { type: 'String', required: true },
});

export default mongoose.model('Rooms', roomsSchema);
