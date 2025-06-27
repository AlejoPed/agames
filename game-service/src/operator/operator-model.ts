import mongoose from 'mongoose';
// import paginate from 'mongoose-paginate-v2';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config'
import { OperatorData } from '../types';

const operatorSchema = new mongoose.Schema({
  operatorId: { type: Number, required: true, unique: true, immutable: true },
  operatorName: { type: String, required: true },
  publicKey: { type: String, required: false },
  role: { type: String, required: true },
  currencies: { type: Object, required: false },
  players: { type: Number, required: false },
  channels: { type: Object, required: false },
  bet: { type: Number, required: false },
  win: { type: Number, required: false },
  active: { type: Boolean, required: true, default: true },
  accountEnv: { type: String, required: true, default: 'sandbox', enum: ['sandbox', 'production'] },
  products: [{
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' }, // Ahora guarda el _id de Mongo
    productId: { type: Number, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true }
  }],
  tokens: [{ token: { type: String, required: true } }],
  password: { type: String, required: true },
  bannedGames: { type: Array, default: [], },
  bannedProducts: { type: Array, default: [] },
  promos: { type: Object, required: false }
},
{
  methods: {
    async generateAuthToken() {
      const token = jwt.sign({ _id: this._id, operatorName: this.operatorName, role: this.role },
        (process.env.SECRET as string));
      const tokenArray = [];
      tokenArray.push({ token });
      this.tokens = tokenArray;
      await this.save();
      return token;
    }
  },
  statics: {
    async findByCredentials(operatorName, password) {
      const user: any = await Operator.findOne({ operatorName });
      if (user == null) {
        return { error: 'Invalid userName' };
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return { error: 'Invalid password' };
      }
      return user;
    },
    async findByOperatorName(operatorName) {
      const user = await Operator.findOne({ operatorName });
      if (user == null) {
        return false;
      }
      return true;
    }
  }
});

// operatorSchema.plugin(paginate);

// this method will hash the password before saving the user model
operatorSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})
operatorSchema.pre('updateOne', async function (next) {
  const newData = this.getUpdate() as OperatorData
  if (newData.password !== undefined) {
    newData.password = await bcrypt.hash(newData.password, 8)
    next()
  }
  next()
})

const Operator = mongoose.model(
  'Operators',
  operatorSchema
);

export default Operator;
