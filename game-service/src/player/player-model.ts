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
  operatorId: { type: Number, required: true },
  channelId: { type: Number, required: true },
  currencies: { type: Object, required: true },
  language: { type: String, required: true },
  lastBalance: { type: Number, required: true },
  bet: { type: Number, required: true },
  win: { type: Number, required: true },
  gameHistory: { type: Array, required: true },
  gameStatus: { type: String, required: true },
  gameNext: { type: String, required: true },
  gameReport: { type: Number, required: true }
});

playerSchema.plugin(paginate);

const Player = mongoose.model(
  'Players',
  playerSchema
);

export default Player;
