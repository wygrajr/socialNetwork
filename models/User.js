const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    thoughts: {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
    friends: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/],
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(() => {
  return this.friends.length
})

const User = model('user', userSchema);

module.exports = User;
