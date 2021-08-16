import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth";
import { useMutation } from "@apollo/react-hooks";

import { Form, Button } from "semantic-ui-react";
import { useForm } from "../utils/customHooks/UserFormHook";
import { REGISTER_USER } from "../graphqlOperations";

export const Register = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { onChange, onSubmit, values } = useForm(registerUser, initialState);
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.exception.stacktrace);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          value={values.username}
          type="text"
          onChange={onChange}
        />

        <Form.Input
          label="Email"
          placeholder="Email..."
          name="email"
          value={values.email}
          type="email"
          onChange={onChange}
        />

        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          value={values.password}
          type="password"
          onChange={onChange}
        />

        <Form.Input
          label="Password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          value={values.confirmPassword}
          type="password"
          onChange={onChange}
        />

        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {errors && Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value} </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
