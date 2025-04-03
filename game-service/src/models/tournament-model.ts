import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

interface TournamentDocument extends mongoose.Document {
  id: number;
  name: string;
  logic: string;
  data: Record<string, any>;
}

const tournamentSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true, immutable: true },
  name: { type: String, required: true },
  logic: { type: String, required: true },
  data: { type: Object, required: true }
});

tournamentSchema.plugin(paginate);

const Tournament = mongoose.model<TournamentDocument, mongoose.PaginateModel<TournamentDocument>>(
  'Tournaments',
  tournamentSchema
);

export default Tournament;
