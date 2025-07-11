import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

interface TransactionDocument extends mongoose.Document {
  id: number;
  extId: number;
  roundId: number;
  type: string;
  operatorId: number;
  channelId: number;
  playerId: number;
  currency: Record<string, any>;
  lastBalance: number;
  amount: number;
  game: string;
  product: string;
}

const transactionSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true, immutable: true },
  extId: { type: Number, required: true },
  roundId: { type: Number, required: true },
  type: { type: String, required: true, enum: ['bet', 'win', 'bonus', 'refund'] },
  operatorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Operators' },
  channelId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Channels' },
  playerId: { type:  mongoose.Schema.Types.ObjectId, required: true, ref: 'Players' },
  currency: { type: Object, required: true },
  lastBalance: { type: Number, required: true },
  amount: { type: Number, required: true },
  game: { type: String, required: true },
  product: { type: String, required: true }
});

transactionSchema.plugin(paginate);

const Transaction = mongoose.model<TransactionDocument, mongoose.PaginateModel<TransactionDocument>>(
  'Transactions',
  transactionSchema
);

export default Transaction;
