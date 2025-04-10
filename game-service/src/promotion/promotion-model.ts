import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const promotionSchema = new mongoose.Schema({
  id: { type: Number, required: true, immutable: true, unique: true },
  name: { type: String, required: true },
  logic: { type: String, required: true },
  data: { type: Object, required: true }
});

promotionSchema.plugin(paginate);

const Promotion = mongoose.model('Promotions', promotionSchema, 'promotions');
export default Promotion;
