import React from "react";
import { Col, Row } from '@themesberg/react-bootstrap';
import { CreateOrderForm } from "../../components/OrderForm";


function CreateOrder() {
  return (
    <>
      <Row>
        <Col>
          How To Order
        </Col>
        <Col xs={12} xl={8}>
          <CreateOrderForm />
        </Col>
      </Row>
    </>
  );
};

export default CreateOrder;