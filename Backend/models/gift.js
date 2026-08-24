const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  src: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
}, { _id: false });

const giftSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, default: 'momo' },
  recipient: { type: String, required: true },
  greeting: { type: String, required: true },
  photos: { type: [photoSchema], default: [] },
  letter: {
    greeting: { type: String, required: true },
    paragraphs: { type: [String], default: [] },
    signature: { type: String, required: true },
  },
  closing: {
    eyebrow: { type: String, default: 'Y ESTO ES SOLO EL PRINCIPIO' },
    title: { type: String, default: 'Por muchos recuerdos más juntos.' },
    text: { type: String, default: 'Feliz cumpleaños, preciosa. ✨' },
  },
}, { timestamps: true });

module.exports = mongoose.model('gift', giftSchema);
