import React, { useState } from "react";
import facade from "../apiFacade";
import { Remove_Memeber_From_Event, Dining_Events } from "./Urls";
import { Table, Container, Button, Form, Modal } from "react-bootstrap";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

const ManageMember = () => {
  const [item, setItem] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const [error, setError] = useState(null);

  const [showDeleteEvent, setShowDeleteEvent] = useState(false);
  const [deleteData, setDeleteData] = useState(null);

  const handleCloseD = () => setShowDeleteEvent(false);

  const handleModalDelete = (evt) => {
    evt.preventDefault();
    setShowDeleteEvent(true);
  };

  const handleDelete = (evt) => {
    evt.preventDefault();
    setShowDeleteEvent(true);
    const options = facade.makeOptions("DELETE", true);
    fetch(Remove_Memeber_From_Event + deleteData.username, options).then(
      (res) => handleHttpErrors(res)
    );
    setDataReady(false);
  };

  const handleonChangeD = (evt) => {
    setDeleteData({ ...deleteData, [evt.target.id]: evt.target.value });
  };

  function getdata() {
    if (!dataReady) {
      const options = facade.makeOptions("GET", true);
      fetch(Dining_Events, options)
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
          <br />
          <h3>
            Delete Member From Event <br />
            (dum måde, men har ikke tid til at lave det om)
          </h3>
          <hr />
          <Modal
            show={showDeleteEvent}
            onHide={handleCloseD}
            className="text-center"
            align="center"
          >
            <Modal.Header closeButton>
              <Modal.Title>Delete Dinner Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleDelete} onChange={handleonChangeD}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <br />
                <Button variant="danger" type="submit">
                  Delete Member
                </Button>
              </Form>
            </Modal.Body>
          </Modal>

          <Table striped bordered hover variant="dark" className="text-center">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Event Name</th>
                <th>Location</th>
                <th>Time</th>
                <th>Delete From Event</th>
              </tr>
            </thead>
            <tbody>
              {item.map((event, idx) => (
                <tr key={idx}>
                  <td>{event.id}</td>
                  <td>{event.eventname}</td>
                  <td>{event.location}</td>
                  <td>{event.time}</td>
                  <td>
                    <Button variant="danger" onClick={handleModalDelete}>
                      Delete Certain Member
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  } else if (error) {
    return <div>{"" + error}</div>;
  } else {
    return <div>Loading...{getdata()}</div>;
  }
};

export default ManageMember;
