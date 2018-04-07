import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const workspaceSchema = new Schema({
  full_name: { type: 'String', required: true },
  display_name: { type: 'String', required: true, unique: true},
  admin_user: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Workspace', workspaceSchema);
