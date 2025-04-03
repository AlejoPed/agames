import mongoose from 'mongoose';
// import paginate from 'mongoose-paginate-v2';

// interface GameDocument extends mongoose.Document {
//   id: number;
//   rtp: number;
//   category: string;
//   rules: any[];
//   events: Record<string, any>;
//   totalPlayers: number;
//   tournament?: Record<string, any>;
//   bet: number;
//   minBet: number;
//   image: string;
// }

const gameSchema = new mongoose.Schema({
  gameId: { type: Number, required: true, unique: true, immutable: true },
  gameName: { type: Number, required: true, unique: true, immutable: true },
  rtp: { type: Number, required: true },
  category: { type: String, required: true },
  rules: { type: Array, required: true },
  events: { type: Object, required: true },
  active: { type: Boolean, required: true },
  totalPlayers: { type: Number, required: true },
  tournament: { type: Object, required: false },
  bet: { type: Number, required: true },
  win: { type: Number, required: true },
  minBet: { type: Number, required: true },
  maxBet: { type: Number, required: true },
  image: { type: String, required: true }
});

// gameSchema.plugin(paginate);

const Game = mongoose.model(
  'Games',
  gameSchema
);

export default Game;
