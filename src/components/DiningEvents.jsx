import React, { useState, useEffect } from "react";
import * as All from "react-bootstrap";
import { Dining_Events } from "./Urls";
import facade from "../apiFacade";

function DiningEvents() {
  const [isDataReady, setDataReady] = useState(false);
  const [item, setItem] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const options = facade.makeOptions("GET", true);
    fetch(Dining_Events, options)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setItem(result);
        setDataReady(true);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (error) {
    return (
      <div>
        <All.Container fluid>
          <All.Row>
            <All.Col>
              <All.Card.Body className="text-center">
                <All.Toast className="d-inline-block m-1" bg="danger">
                  <All.Toast.Body>
                    <strong className="me-auto">Nothing Found!</strong>
                    <strong className="me-auto">{error}</strong>
                  </All.Toast.Body>
                </All.Toast>
              </All.Card.Body>
            </All.Col>
          </All.Row>
        </All.Container>
      </div>
    );
  } else if (isDataReady) {
    return (
      <div align="center">
        <h5>Dinner Events: </h5>
        <All.Table
          striped
          bordered
          hover
          variant="dark"
          className="text-center"
        >
          <thead>
            <tr>
              <th>#Event ID</th>
              <th>Event Name</th>
              <th>Location</th>
              <th>Time</th>
              <th>Meal</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {item.map((event, idx) => (
              <tr key={idx}>
                <td>{event.id}</td>
                <td>{event.eventname}</td>
                <td>{event.location}</td>
                <td>{event.time}</td>
                <td>{event.dish}</td>
                <td>{event.priceprperson}</td>
              </tr>
            ))}
          </tbody>
        </All.Table>
      </div>
    );
  } else {
    return (
      <>
        <div>
          <All.Card.Header className="text-center">
            <h1>
              Loading...
              <All.Spinner animation="border" />
            </h1>
          </All.Card.Header>
        </div>
      </>
    );
  }
}

export default DiningEvents;
