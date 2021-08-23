const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  email: String,
  comments: [
    {
      body: String,
      username: String,
      email: String,
      createdAt: String,
      commentLikes: [
        {
          createdAt: String,
          username: String,
          email: String,
        },
      ],
    },
  ],
  likes: [
    {
      username: String,
      email: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("Post", postSchema);
