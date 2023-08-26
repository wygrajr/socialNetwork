const router = require('express').Router();
const {
  getAllThought,
  getThoughtId,
} = require('../../controllers/thoughtController.js');

router.route('/').get(getAllThought);

router
  .route("/:id").get(getThoughtId)

module.exports = router;
