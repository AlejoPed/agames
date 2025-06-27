import mongoose from 'mongoose';
// import paginate from 'mongoose-paginate-v2';

// interface ChannelDocument extends mongoose.Document {
//   id: number;
//   operatorId: number;
//   name: string;
//   players: number;
//   rtp: Record<string, any>;
//   bet: number;
//   win: number;
//   onPlayer: number;
//   ipAddress: string;
// }

const channelSchema = new mongoose.Schema({
  channelId: { type: Number, required: true, unique: true, immutable: true },
  operatorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Operators' },
  name: { type: String, required: true },
  players: { type: Number, required: false },
  rtp: { type: Object, required: false },
  bet: { type: Number, required: false },
  active: { type: Boolean, required: true, default: true },
  win: { type: Number, required: false },
  onPlayers: { type: Number, required: false },
  ipAddress: { type: Array, default: [] },
  walletUrl: { type: String, required: false },
});

// channelSchema.plugin(paginate);

const Channel = mongoose.model(
  'Channels',
  channelSchema
);

export default Channel;
