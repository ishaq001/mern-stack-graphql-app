const { AuthenticationError } = require("apollo-server");

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (
      token ===
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDdjZWUyMGQ2NDc2MTYyYzYzN2Y0MSIsImVtYWlsIjoib3Jha2syMjExQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiaXNoYXEiLCJpYXQiOjE2Mjg1MDcxNzgsImV4cCI6MTYyODUxMDc3OH0.yokb1nyBgVUANOBpBJwYNSlz_vfiwgCQ1Ehc7gh-i_c"
    ) {
      console.log("here it is");
    }
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired Token", {
          err,
        });
      }
    }

    throw new Error("Authentication Token must be 'Bearer [token]");
  }
  throw new Error("Authorization Header must be provided");
};
