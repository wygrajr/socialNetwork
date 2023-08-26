const router = require('express').Router();
const {
  getAllThought,
  getThoughtId,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController.js');

router.route('/').get(getAllThought).post(createThought);

router
  .route("/:id").get(getThoughtId).put(updateThought).delete(deleteThought);

module.exports = router;
