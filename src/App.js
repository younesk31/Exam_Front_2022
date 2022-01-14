import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import facade from "./apiFacade";
import Nesting from "./components/NestedRoutes";
import { Server_URL } from "./components/Urls";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  Toast,
  ButtonGroup,
  Container,
} from "react-bootstrap";

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [error, setError] = useState(null);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };

  const performCreation = (evt) => {
    evt.preventDefault();
    createLogin(loginCredentials.username, loginCredentials.password);
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  const createLogin = async function (user, password) {
    const options = facade.makeOptions("POST", true, {
      username: user,
      password: password,
    });
    const res = await fetch(Server_URL + "/api/info/createuser", options);
    if (!res.ok) {
      setError("user/password already exists!");
    }
    if (res.ok) {
      login(user, password);
    }
  };

  return (
    <div>
      <Container fluid>
        <Form onChange={onChange}>
          <Row className="align-items-center">
            <Col></Col>
            <Col xs="auto">
              <h1>Exam Project ({new Date().getFullYear()}) - Login page</h1>
              <h1>SP1 - Communal Dining Club</h1>
            </Col>
            <Col></Col>
          </Row>
          <Row className="align-items-center">
            <Col></Col>
            <Col>
              <Form.Label>Username</Form.Label>
              <Form.Control id="username" placeholder="Username" />
            </Col>
            <Col>
              <Form.Label>Password</Form.Label>
              <Form.Control
                id="password"
                type="password"
                placeholder="Password"
              />
            </Col>
            <Col></Col>
          </Row>
          <Row className="align-items-center">
            <Col></Col>

            <Col xs="auto">
              {error != null && (
                <Toast className="d-inline-block m-1" bg="danger">
                  <Toast.Body>
                    <strong className="align-items-center">{error}</strong>
                  </Toast.Body>
                </Toast>
              )}

              <Card.Body>
                <ButtonGroup aria-label="Basic example">
                  <Button onClick={performLogin} variant="primary" size="lg">
                    Login
                  </Button>
                  <Button
                    onClick={performCreation}
                    variant="success"
                    size="lg"
                    disabled
                  >
                    Create User
                  </Button>
                </ButtonGroup>
              </Card.Body>
            </Col>
            <Col></Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
function LoggedIn() {
  let token = jwt_decode(facade.getToken());

  return (
    <div>
      <Nesting userrole={token.roles} />
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    setUsername("Anonymous");
  };
  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then((res) => setLoggedIn(true), setUsername(user));
  };

  return (
    <div>
      {!loggedIn ? (
        <LogIn login={login} />
      ) : (
        <div>
          <LoggedIn />
          <Card.Body></Card.Body>
          <Card.Footer className="text-muted">
            <Row>
              <Col>
                Eksamens Project | Younes Karim | {new Date().getFullYear()}
              </Col>
              <Col></Col>
              Logged in as: {username}
              <Col xs="auto">
                <Button onClick={logout} variant="danger" size="sm">
                  Logout
                </Button>
              </Col>
            </Row>
          </Card.Footer>
        </div>
      )}
    </div>
  );
}
export default App;
