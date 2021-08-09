const bcrypt = require("bcryptjs");
const { UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");
const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user?.id,
      email: user?.email,
      username: user?.username,
    },
    SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
};

module.exports = {
  Mutation: {
    //resolver arguemnts provide (parent,args, context, info )
    //parent provides what was the input from the last step(IN CASE OF MULTIPLE RESOLVERS)
    //args will be the inputs where we created our register mutation in posts resolver
    //info contains some meta data information

    //deleteUser
    // async deleteUser(_, { id }) {
    //   const user = await User.deleteOne({ id });
    //   if (!user) {
    //     throw new Error("No User Found");
    //   }
    //   const token = generateToken(user);
    //   return {
    //     ...user._doc,
    //     id: user._id,
    //     token,
    //   };
    // },

    //login user
    async login(_, { email, password }) {
      const { errors, valid } = validateLoginInput(email, password);

      const user = await User.findOne({ email });
      if (!valid) {
        throw new UserInputError("Errors", {
          errors,
        });
      }
      if (!user) {
        errors.general = "User not found with this email.";
        throw new UserInputError("Wrong Creds", {
          errors,
        });
      }

      const match = bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong Creds";
        throw new UserInputError("Wrong Credentials", {
          errors,
        });
      }

      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    //register user
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", {
          errors,
        });
      }

      const user = await User.findOne({ email });
      if (user) {
        throw new UserInputError("User already exists on this email", {
          email: "Account already exists on this email.",
        });
      }
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const result = await newUser.save();
      const token = generateToken(result);

      return {
        ...result._doc,
        id: result._id,
        token,
      };
    },
  },
};
