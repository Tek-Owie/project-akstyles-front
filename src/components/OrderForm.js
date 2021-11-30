import React, { useState, useEffect } from "react";
import { Col, Row, Card, Form, Button } from '@themesberg/react-bootstrap';
import { getProducts } from "../Pages/apiCore";
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const CreateOrderForm = () => {
  const [services, setServices] = useState([]);

  const loadServices = () => {
    getProducts().then(data => {
      if(data.error) {
        return data.error;
      } else {
        const services = data;
        setServices(services);
      }
    })
  }

  useEffect(() => {
    loadServices()
  }, []);

  const showAmount = () => {
    return services.reduce((previousValue, currentValue) =>{
      return previousValue + currentValue.count * currentValue.price
    }, 0)
  };

  const goBack = () => (
    <div className="mt-5">
        <Button href="/" variant="outline-danger">
            Back to Homepage <FontAwesomeIcon icon={faHome}/>
        </Button>
    </div>
  );

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Create Your Order</h5>
        <Form>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select>
                  <option defaultValue>Select category</option>
                  {services && services.map((item, index) => (
                    <option key={index} value={item._id}>{item.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={12} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Social Media Username</Form.Label><Form.Text id="passwordHelpBlock" muted>Enter your social media username you want followers/likes on</Form.Text>
                <Form.Control required type="text" placeholder="Username" aria-describedby="passwordHelpBlock" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Social Media Social Link</Form.Label>
                <Form.Control required type="text" placeholder="https://instagram.com/username" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Quantity</Form.Label>
                <Form.Control required type="text" placeholder="Quantity" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Total Amount</Form.Label>
                <Form.Control readOnly placeholder={showAmount()}/>
              </Form.Group>
            </Col>
          </Row>
          
          <div className="mt-3">
            <Button variant="outline-secondary" type="submit">Continue</Button>
          </div>
        </Form>
        {goBack()}
      </Card.Body>
    </Card>
  );
};
