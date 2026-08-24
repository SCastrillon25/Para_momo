const Gift = require('../models/gift');

const getGift = async (req, res) => {
  try {
    const gift = await Gift.findOne({ slug: req.params.slug || 'momo' }).lean();
    if (!gift) return res.status(404).json({ message: 'Regalo no encontrado' });
    return res.status(200).json(gift);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el regalo' });
  }
};

const updateGift = async (req, res) => {
  try {
    const gift = await Gift.findOneAndUpdate(
      { slug: req.params.slug || 'momo' },
      req.body,
      { new: true, runValidators: true, upsert: true }
    );
    return res.status(200).json(gift);
  } catch (error) {
    return res.status(400).json({ message: 'Error al actualizar el regalo', error: error.message });
  }
};

module.exports = { getGift, updateGift };
