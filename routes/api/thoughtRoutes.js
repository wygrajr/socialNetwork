const router = require('express').Router();
const {
  getAllThought,
  getThoughtId,
  createThought,
} = require('../../controllers/thoughtController.js');

router.route('/').get(getAllThought).post(createThought);

router
  .route("/:id").get(getThoughtId)

module.exports = router;
