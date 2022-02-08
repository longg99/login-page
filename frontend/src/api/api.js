import axios from "axios";

// call the api to verify the credentials
export const verifyLogin = async (credentials) => {
  // get the username and password from the param
  const { username, password } = credentials;

  return await axios({
    method: "post",
    url: "api/login",
    headers: {
      "Content-Type": "application/json",
      username: username,
      password: password,
    },
  });
};

// send an user obj to the server
export const signUpUser = async (user) => {
  return await axios({
    method: "post",
    url: "api/sign-up",
    data: {
      ...user,
    },
  });
};
