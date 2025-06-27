import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

// interface PlayerDocument extends mongoose.Document {
//   id: number;
//   extId: number;
//   name: string;
//   operatorId: number;
//   channelId: number;
//   currencies: Record<string, any>;
//   language: string;
//   lastBalance: number;
//   bet: number;
//   win: number;
//   gameHistory: any[];
//   gameStatus: string;
//   gameNext: string;
//   gameReport: number;
// }

const playerSchema = new mongoose.Schema({
  playerId: { type: Number, required: true, unique: true, immutable: true },
  extId: { type: Number, required: true },
  name: { type: String, required: true },
  operatorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Operators' },
  channelId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Channels' },
  currencies: { type: Object, required: false },
  language: { type: String, required: false },
  lastBalance: { type: Number, required: false },
  bet: { type: Number, required: false },
  win: { type: Number, required: false },
  gameHistory: { type: Array, required: false },
  gameStatus: { type: String, required: false },
  gameNext: { type: String, required: false },
  gameReport: { type: Number, required: false }
});

playerSchema.plugin(paginate);

const Player = mongoose.model(
  'Players',
  playerSchema
);

export default Player;
