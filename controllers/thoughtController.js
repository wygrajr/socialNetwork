const { Thought } = require('../models');

const thoughtController = {
  getAllThought(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getThoughtId({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((thoughtId) => {
        if (!thoughtId) {
          return res
            .status(404);
        }
        res.json(thoughtId);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((createThought) => {
        if (!createThought) {
          return res
            .status(404);
        }
      })
      .catch((err) => res.json(err));
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((updateThought) => {
        if (!updateThought) {
          res.status(404);
          return;
        }
        res.json(updateThought);
      })
      .catch((err) => res.json(err));
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((deleteThought) => {
        if (!deleteThought) {
          return res.status(404);
        }

        return User.findOneAndUpdate(
          { thoughts: params.id },
          { $pull: { thoughts: params.id } },
        );
      })
      .then((deleteThought) => {
        if (!deleteThought) {
          return res
            .status(404);
        };
      })
      .catch((err) => res.json(err));
  },

};

module.exports = thoughtController;