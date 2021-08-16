module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "username should not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email should not be empty";
  } else {
    const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (!email.match(regex))
      errors.email = "Email should be a valid email address";
  }
  if (password === "") {
    errors.password = "Password should not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors) < 1,
  };
};

module.exports.validateLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === "") {
    errors.email = "Email should not be empty";
  } else {
    const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (!email.match(regex))
      errors.email = "Email should be a valid email address";
  }
  if (password === "") {
    errors.password = "Password should not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
