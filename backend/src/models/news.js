const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String },
  content: { type: String },
  code: { type: String, required: true },
  crawl: { type: Boolean, required: true, default: false },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' }
}, {
  timestamps: true,
});

const News = mongoose.model('New', newsSchema);

module.exports = News;