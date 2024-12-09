import mongoose from "mongoose"


export interface Subscriptions {
  endpoint: string;
  key: string;
  token: string;
}

const itemSchema = new mongoose.Schema({
  endpoint: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Subscriptions', itemSchema);
