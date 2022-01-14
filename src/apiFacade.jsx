import jwt_decode from "jwt-decode";
import { Server_URL } from "./components/Urls";
function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({
      status: res.status,
      fullError: res.json(),
    });
  }
  return res.json();
}

function apiFacade() {
  let decoded;

  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
    decoded = jwt_decode(token);
  };

  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const login = async (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    const res = await fetch(Server_URL + "/api/login", options);
    const res_1 = await handleHttpErrors(res);
    setToken(res_1.token);
  };

  const fetchData = async () => {
    const options = makeOptions("GET", true); //True add's the token
    const res = await fetch(Server_URL + "/api/info/" + decoded.roles, options);
    return handleHttpErrors(res);
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    handleHttpErrors,
  };
}
const facade = apiFacade();
export default facade;
