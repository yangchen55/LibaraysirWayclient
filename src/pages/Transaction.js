import React, { useEffect, useState } from "react";
import { Container, Row, Table } from "react-bootstrap";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getAllTransactions } from "../helpers/axiosHelper";

const Transaction = () => {
  const [transaction, setTransaction] = useState([]);

  const fetchTransaction = async () => {
    const res = await getAllTransactions();
    setTransaction(res);
  };

  useEffect(() => {
    fetchTransaction();
  }, []);
  console.log(transaction);
  return (
    <DashboardLayout>
      <Container>
        <Row className="p-5">
          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>BOOK</th>
                <th>Title</th>
                <th>AUthor</th>
                <th>borrowed by</th>
                <th>borrowed date</th>
                <th>return date</th>
              </tr>
            </thead>
            <tbody>
              {transaction.map((trans, i) => (
                <tr key={trans._id} className="text-center">
                  <td>{i + 1}</td>
                  <td>
                    <img
                      src={trans.borrowedBook.thumbnail}
                      alt=""
                      style={{ width: "35%" }}
                    ></img>
                  </td>
                  <td> {trans.borrowedBook.title}</td>
                  <td> {trans.borrowedBook.author}</td>
                  <td> {trans.borrowedBy.userName}</td>
                  <td> {new Date(trans.createdAt).toLocaleDateString()}</td>
                  {/* return date import for yangchen  */}

                  <td
                    className={
                      trans.returnDate ? "text-success" : "text-danger"
                    }
                  >
                    {trans.returnDate
                      ? new Date(trans.returnDate).toLocaleDateString()
                      : "not returned yet"}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>
    </DashboardLayout>
  );
};

export default Transaction;
