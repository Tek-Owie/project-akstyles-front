import React, { Fragment } from "react";
import { faBoxOpen, faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from '@themesberg/react-bootstrap';

import { CounterWidget } from "../../components/Widgets";
import { isAuthenticated } from "../../auth";

const Index = () => {
  return (
    <>
      {isAuthenticated() && (
        <Fragment>
          <Row className="justify-content-md-center">
            <Col xs={12} sm={6} xl={4} className="mb-4">
              <CounterWidget
                category="Available Balance"
                title="NGN10,000"
                period="Feb 1 - Apr 1"
                percentage={18.2}
                icon={faMoneyCheck}
                iconColor="shape-secondary"
              />
            </Col>

            <Col xs={12} sm={6} xl={4} className="mb-4">
              <CounterWidget
                category="Order"
                title="5"
                period="Feb 1 - Apr 1"
                percentage={28.4}
                icon={faBoxOpen}
                iconColor="shape-tertiary"
              />
            </Col>

            <Col xs={12} sm={6} xl={4} className="mb-4">
              {/* <CircleChartWidget
                title="Traffic Share"
                data={trafficShares} /> */}
            </Col>
          </Row>
        </Fragment>
      )}
    </>
  );
};

export default Index;
