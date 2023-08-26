const router = require('express').Router();

const {
  getAllUser,
  getUserId,
} = require('../../controllers/userController');

router.route('/').get(getAllUser);

router.route('/:Id').get(getUserId);

module.exports = router;
