import React, { useState } from "react";
import facade from "../apiFacade";
import { Server_URL } from "./Urls";
import {
  Table,
  Container,
  ButtonGroup,
  Button,
  Form,
  Modal,
} from "react-bootstrap";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

const More = () => {
  const [newUser, setNewUser] = useState();
  const [item, setItem] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const [error, setError] = useState(null);
  const [currentuser, setCurrentUser] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const options = facade.makeOptions("PUT", true, newUser);
    fetch(Server_URL + "/api/info/edituser", options).then((res) =>
      handleHttpErrors(res)
    );
    setCurrentUser(null);
    setShow(false);
  };

  const handleonChange = (evt) => {
    setNewUser({ username: currentuser, password: evt.target.value });
  };

  const handleDelete = (evt) => {
    evt.preventDefault();
    let username = evt.target.value;
    const options = facade.makeOptions("DELETE", true, newUser);
    fetch(Server_URL + "/api/info/admin/deleteuser/" + username, options).then(
      (res) => handleHttpErrors(res)
    );
    setDataReady(false);
  };

  const handleEdit = (evt) => {
    evt.preventDefault();
    setCurrentUser(evt.target.value);
    setShow(true);
  };

  function getdata() {
    if (!dataReady) {
      const options = facade.makeOptions("GET", true);
      fetch(Server_URL + "/api/info/admin/users", options)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((result) => {
          setItem(result);
          setDataReady(true);
        })
        .catch((error) => {
          setError(error);
          setDataReady(false);
        });
    }
  }

  if (dataReady) {
    return (
      <div>
        <Container className="text-center">
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Change User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit} onChange={handleonChange}>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder={currentuser} disabled />
                <Form.Group className="mb-3" id="password">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Change User Details
                </Button>
              </Form>
            </Modal.Body>
          </Modal>

          <br />
          <h3>Member List</h3>
          <hr />
          <br />
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {item.map((user, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{user.username}</td>
                  <td>
                    <ButtonGroup>
                      <Button
                        value={user.username}
                        variant="success"
                        onClick={handleEdit}
                      >
                        Edit
                      </Button>
                      <Button
                        value={user.username}
                        variant="danger"
                        onClick={handleDelete}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  } else if (error) {
    return { error };
  } else {
    return <div>Loading...{getdata()}</div>;
  }
};

export default More;
