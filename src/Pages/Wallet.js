/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Breadcrumb,} from '@themesberg/react-bootstrap';
import { CreditCard } from "../components/CreditCard";

export default () => {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>React</Breadcrumb.Item>
            <Breadcrumb.Item active>Wallet</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Wallet</h4>
        </div>
      </div>
      <Row>

        <Col xs={12} xl={8}>
          <CreditCard />
        </Col>
      </Row>
    </>
  );
};
