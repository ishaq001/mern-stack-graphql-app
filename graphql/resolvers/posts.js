const { AuthenticationError } = require("apollo-server");

const Post = require("../../models/Post");

const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      if (ars.body.trim() === "") {
        throw new Error("Post should not be empty");
      }
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },

    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      console.log("user", user);
      try {
        const post = await Post.findById(postId);
        if (user.email === post.email) {
          await post.delete();
          return "Post deleted Successfully";
        } else {
          throw new AuthenticationError(
            "You are not the author of the post. Sorry you cannot delete it."
          );
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
