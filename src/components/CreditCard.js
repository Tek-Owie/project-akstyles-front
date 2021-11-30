
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';


export const CreditCard = () => {
  return (      
        <Form className="shadow-sm p-3 mb-4 card border-light">
            <div className="border-light p-3 mb-4 mb-md-0 card-header">
                <h5 className="mb-0">Card details</h5>
              </div>
              <Card.Body>
                <Row>
                    <Col md={6} className="mb-3">
                    <Form.Group id="cardNameLabel">
                        <Form.Label>(Full name as displayed on card)<span className="text-danger"> * </span></Form.Label>
                        <Form.Control required type="text" placeholder="Name on Card" />
                    </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                        <Form.Group id="cardNumberLabel">
                            <Form.Label>Card Number<span className="text-danger"> * </span></Form.Label>
                            <InputGroup>
                                <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="0000 0000 0000 0000"
                                    />
                              </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className="mb-3">
                    <Form.Group id="cardCVCLabel">
                        <Form.Label>CVC<span className="text-danger"> * </span></Form.Label>
                        <Form.Control required type="number" placeholder="CVC" />
                    </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                        <Form.Group id="cardExpiryLabel">
                            <Form.Label>Card Expiry<span className="text-danger"> * </span></Form.Label>
                            <InputGroup>
                                <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="MM / YY"
                                    />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <div className="mt-4 col-12">
                    <Button variant="primary" type="submit">Pay</Button>
                </div>
            </Card.Body>
        </Form>
  );
};
