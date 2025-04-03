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
  operatorId: { type: Number, required: true },
  name: { type: String, required: true },
  players: { type: Number, required: true },
  rtp: { type: Object, required: true },
  bet: { type: Number, required: true },
  active: { type: Boolean, required: true },
  win: { type: Number, required: true },
  onPlayers: { type: Number, required: true },
  ipAddress: { type: Array, default: [] },
  walletUrl: { type: Array, default: [] }
});

// channelSchema.plugin(paginate);

const Channel = mongoose.model(
  'Channels',
  channelSchema
);

export default Channel;
