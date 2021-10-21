const router = require('express').Router();
const { Notes } = require('../../models');
const authMiddleware = require('../../middleware/auth');

router.post('/newNote', authMiddleware, async (req, res) => {
  try {
    const newNote = await Notes.create({
      Text: req.body.text,
      user_id: req.body.user_id,
    });
    res.status(200).json({ success: true, data: newNote });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const notes = await Notes.findAll({ where: { user_id: req.body.user_id } });
    res.status(200).json({ success: true, notes: notes });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
