import React, { useState, useEffect } from "react";
import { Spinner, Card, Table } from "react-bootstrap";
import { Server_URL, Transactions } from "./Urls";
import facade from "../apiFacade";

function AccountStatus() {
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [isDataReady, setDataReady] = useState(false);
  const [item, setItem] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const options = facade.makeOptions("GET", true);
    fetch(Server_URL + "/api/info/userdata", options)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setItem({
          username: result.username,
          address: result.address,
          phone: result.phone,
          email: result.email,
          birthYear: result.birthYear,
          accountBalance: result.accountBalance,
        });
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    const options = facade.makeOptions("GET", true);
    fetch(Transactions, options)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setTransactions(result);
        setDataReady(true);
        setLoadingScreen(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (isDataReady && !loadingScreen) {
    return (
      <div align="center">
        <h5>User Data:</h5>
        <Table striped bordered hover variant="dark" className="text-center">
          <thead>
            <tr>
              <th>Member Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Birth Year</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr key={item.username}>
              <td>{item.username}</td>
              <td>{item.address}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{item.birthYear}</td>
              <td>{item.accountBalance}</td>
            </tr>
          </tbody>
        </Table>
        <h5>Member Transaction Data:</h5>
        <Table striped bordered hover variant="dark" className="text-center">
          <thead>
            <tr>
              <th>#Transaction ID</th>
              <th>Status</th>
              <th>Transaction Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((event, idx) => (
              <tr key={idx}>
                <td>{event.id}</td>
                <td>{event.status}</td>
                <td>{event.transactionAmount}</td>
                <td>{event.transactionDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  } else if (error) {
    return (
      <>
        <div align="center">{" " + error + " "}</div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <Card.Header className="text-center">
            <h1>
              Loading...
              <Spinner animation="border" />
            </h1>
          </Card.Header>
        </div>
      </>
    );
  }
}

export default AccountStatus;
