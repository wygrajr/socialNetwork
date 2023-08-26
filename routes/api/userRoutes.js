const router = require('express').Router();

const {
  getAllUser,
  getUserId,
  createUser,
} = require('../../controllers/userController');

router.route('/').get(getAllUser).post(createUser);

router.route('/:Id').get(getUserId);

module.exports = router;
