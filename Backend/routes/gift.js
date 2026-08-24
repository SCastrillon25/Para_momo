const router = require('express').Router();
const { getGift, updateGift } = require('../controllers/gift');
const auth = require('../middlewares/auth');

router.get('/', auth, getGift);
router.get('/:slug', auth, getGift);

router.put('/', auth, updateGift);
router.put('/:slug', auth, updateGift);

module.exports = router;