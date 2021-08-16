const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestsSchema = new Schema({
    receiveUserId: { type: Schema.Types.ObjectId, ref: 'New' },
    senderName: { type: String, required: true },
    senderEmail: { type: String, required: true },
    senderPhone: { type: String, required: true },
    code: { type: String, required: true },
    note: { type: String },
    supportCount: { type: Number, required: true },
    type: { type: Number, required: true },
    status: { type: Number, required: true },
    viewAt: { type: Date, required: true, default: Date.now },
}, {
    timestamps: true,
});

const Request = mongoose.model('Request', requestsSchema);

module.exports = Request;