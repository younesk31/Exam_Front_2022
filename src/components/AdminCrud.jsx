import React, { useState } from "react";
import facade from "../apiFacade";
import {
  Dining_Events,
  Create_Event,
  Update_Dining_Event,
  Remove_Dining_Event,
} from "./Urls";
import { Table, Container, Button, Form, Modal, Row } from "react-bootstrap";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

const AdminCrud = () => {
  const [createData, setCreateData] = useState(null);
  const [updateData, setUpdateData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  const [item, setItem] = useState([]);
  const [dataReady, setDataReady] = useState(false);

  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showUpdateEvent, setShowUpdateEvent] = useState(false);
  const [showDeleteEvent, setShowDeleteEvent] = useState(false);

  const handleCloseC = () => setShowCreateEvent(false);
  const handleCloseU = () => setShowUpdateEvent(false);
  const handleCloseD = () => setShowDeleteEvent(false);

  const handleonChangeC = (evt) => {
    setCreateData({ ...createData, [evt.target.id]: evt.target.value });
  };
  const handleonChangeU = (evt) => {
    setUpdateData({ ...updateData, [evt.target.id]: evt.target.value });
  };
  const handleonChangeD = (evt) => {
    setDeleteData({ ...deleteData, [evt.target.id]: evt.target.value });
  };

  const handleModalCreate = (evt) => {
    evt.preventDefault();
    setShowCreateEvent(true);
  };
  const handleCreate = (evt) => {
    evt.preventDefault();
    setShowCreateEvent(true);
    const options = facade.makeOptions("POST", true, createData);
    fetch(Create_Event, options).then((res) => handleHttpErrors(res));
    setDataReady(false);
  };

  const handleModalUpdate = (evt) => {
    evt.preventDefault();
    setShowUpdateEvent(true);
  };
  const handleUpdate = (evt) => {
    evt.preventDefault();
    setShowUpdateEvent(true);
    const options = facade.makeOptions("PUT", true, updateData);
    fetch(Update_Dining_Event + "/" + updateData.idtochange, options).then(
      (res) => handleHttpErrors(res)
    );
    setDataReady(false);
  };

  const handleModalDelete = (evt) => {
    evt.preventDefault();
    setShowDeleteEvent(true);
  };
  const handleDelete = (evt) => {
    evt.preventDefault();
    setShowDeleteEvent(true);
    const deleteobj = { id: deleteData.eventID };
    const options = facade.makeOptions("DELETE", true, deleteobj);
    fetch(Remove_Dining_Event, options).then((res) => handleHttpErrors(res));
    setDataReady(false);
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
          setDataReady(false);
        });
    }
  }

  if (dataReady) {
    return (
      <div>
        <Container>
          <hr />
          <Row>
            <Button variant="success" onClick={handleModalCreate}>
              [C]reate Dinner Event
            </Button>
          </Row>
          <Row className="text-center">
            <h3 className="text-center">[R]ead Dinner Event List</h3>
            <hr />
            <br />
            <Table
              striped
              bordered
              hover
              variant="dark"
              className="text-center"
            >
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Event Name</th>
                  <th>Location</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {item.map((event, idx) => (
                  <tr key={idx}>
                    <td>{event.id}</td>
                    <td>{event.eventname}</td>
                    <td>{event.location}</td>
                    <td>{event.time}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
          <Row>
            <Button variant="primary" onClick={handleModalUpdate}>
              [U]pdate Dinner Event
            </Button>
          </Row>
          <Row>
            <Button variant="danger" onClick={handleModalDelete}>
              [D]elete Dinner Event
            </Button>
          </Row>

          <Modal show={showCreateEvent} onHide={handleCloseC}>
            <Modal.Header closeButton>
              <Modal.Title>Create Dinner Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleCreate} onChange={handleonChangeC}>
                <Form.Group className="mb-3" controlId="eventname">
                  <Form.Label>Dinner Event Name</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="dish">
                  <Form.Label>Dish</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                  <Form.Label>Price Per Person</Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="time">
                  <Form.Label>Time</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">
                  Create Event
                </Button>
              </Form>
            </Modal.Body>
          </Modal>

          <Modal show={showUpdateEvent} onHide={handleCloseU}>
            <Modal.Header closeButton>
              <Modal.Title>Update Dinner Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleUpdate} onChange={handleonChangeU}>
                <Form.Group className="mb-3" controlId="idtochange">
                  <Form.Label>#ID To change</Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="eventname">
                  <Form.Label>Dinner Event Name</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="dish">
                  <Form.Label>Dish</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                  <Form.Label>Price Per Person</Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="time">
                  <Form.Label>Time</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">
                  Update Event
                </Button>
              </Form>
            </Modal.Body>
          </Modal>

          <Modal show={showDeleteEvent} onHide={handleCloseD}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Dinner Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleDelete} onChange={handleonChangeD}>
                <Form.Group className="mb-3" controlId="eventID">
                  <Form.Label>Dinner Event ID</Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
                <br />
                <Button variant="danger" type="submit">
                  Delete Event
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    );
  } else {
    return <div>Loading...{getdata()}</div>;
  }
};

export default AdminCrud;
