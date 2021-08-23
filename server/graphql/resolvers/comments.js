const { UserInputError, AuthenticationError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username, email } = checkAuth(context);
      if (body.trim === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not be empty",
          },
        });
      }

      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          email,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError("Post not Found");
    },

    deleteComment: async (_, { postId, commentId }, context) => {
      const { email, username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex(
          (comment) => comment.id === commentId
        );

        if (post.comments[commentIndex].email === email) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    },

    likeComment: async (_, { postId, commentId }, context) => {
      const { email, username } = checkAuth(context);
      const post = await Post.findById(postId);

      if (post) {
        post?.comments.map((comment) => {
          if (commentId === comment.id) {
            if (comment.commentLikes?.find((like) => like.email === email)) {
              // console.log("here inside");
              comment.commentLikes = comment.commentLikes?.filter(
                (like) => like.email !== email
              );
            } else {
              comment.commentLikes?.push({
                email,
                username,
                createdAt: new Date().toISOString(),
              });
              console.log("post.push", post?.comments[0]?.commentLikes);
            }
          } else {
            throw new UserInputError("No Comment Found");
          }
        });

        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }

      // if(post.comments[commentIndex].email === )
    },

    likePost: async (_, { postId }, context) => {
      const { email, username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        if (post.likes.find((like) => like.email === email)) {
          //post liked
          post.likes = post.likes.filter((like) => like.email !== email);
        } else {
          post.likes.push({
            email,
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();

        return post;
      } else {
        throw new UserInputError("Post not found!");
      }
    },
  },
};
