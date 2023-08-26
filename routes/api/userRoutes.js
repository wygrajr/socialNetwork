const router = require('express').Router();

const {
  getAllUser,
  getUserId,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController');

router.route('/').get(getAllUser).post(createUser);

router.route('/:Id').get(getUserId).put(updateUser).delete(deleteUser);

module.exports = router;
