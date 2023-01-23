import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Container,
  Button,
  Modal,
  Form,
  Toast,
} from "react-bootstrap";
import DashboardLayout from "../components/layout/DashboardLayout";
import { updatePassword } from "../helpers/axiosHelper";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const u = JSON.parse(sessionStorage.getItem("user"));
    setUser(u);
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, password, confirmPassword } = formData;
    if (confirmPassword !== password) {
      return toast.error("confirm password and password don not match");
    }

    const { status, message } = await updatePassword({
      currentPassword,
      password,
    });
    toast[status](message);
  };

  return (
    <DashboardLayout>
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>update password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-3">
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>current password</Form.Label>
                <Form.Control
                  type="password"
                  name="currentPassword"
                  placeholder="enter current password"
                  onChange={handleOnChange}
                ></Form.Control>
                <Form.Label>New password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="
                  new password"
                  onChange={handleOnChange}
                ></Form.Control>
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="confirm password"
                  name="confirmPassword"
                  onChange={handleOnChange}
                ></Form.Control>
              </Form.Group>
              <Button className="mt-2" type="submit">
                submit
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
      <Container>
        <Row className="p-5">
          <Col md={8}>
            <div>
              <ul>
                <li>
                  <strong>Profile ID: </strong>
                  {user?._id}
                </li>
                <li>
                  <strong>Name:</strong>
                  {`${user?.fName} ${user?.lName}`}
                </li>
                <li>
                  <strong>Email:</strong>
                  {user?.email}
                </li>

                <li>
                  <strong>status: </strong>
                  <span
                    className={
                      user?.status === "active" ? "text-success" : "text-danger"
                    }
                  >
                    {user?.status}
                  </span>
                </li>
              </ul>
            </div>
          </Col>
          <Col>
            <Button variant="danger" onClick={() => setShowForm(true)}>
              update Password
            </Button>
          </Col>
        </Row>
      </Container>
    </DashboardLayout>
  );
};

export default Profile;
