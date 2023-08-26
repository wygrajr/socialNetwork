const { User } = require('../models');

const userController = {
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getUserId({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((userId) => {
        if (!userId) {
          return res
            .status(404);
        }
        res.json(userId);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  
  createUser({ body }, res) {
    User.create(body)
      .then((createUser) => res.json(createUser))
      .catch((err) => res.json(err));
  },
};



module.exports = userController;