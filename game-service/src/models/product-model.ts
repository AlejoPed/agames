import mongoose from 'mongoose';
// import paginate from 'mongoose-paginate-v2';

// interface ProductDocument extends mongoose.Document {
//   id: number;
//   category: string;
//   games: any[];
//   bet: number;
//   win: number;
//   description: string;
//   image: string;
// }

const productSchema = new mongoose.Schema({
  productId: { type: Number, required: true, unique: true, immutable: true },
  category: { type: String, required: true },
  games: { type: Array, required: true },
  active: { type: Boolean, required: true },
  bet: { type: Number, required: true },
  win: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }
});

// productSchema.plugin(paginate);

const Product = mongoose.model(
  'Products',
  productSchema
);

export default Product;
