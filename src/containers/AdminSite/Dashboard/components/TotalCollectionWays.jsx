/* eslint-disable react/prop-types */
import React from 'react';
import {
  Card, CardBody, Col, Progress,
} from 'reactstrap';
// import TrendingUpIcon from 'mdi-react/TrendingUpIcon';

const TotalCollectionWays = ({ logistics }) => (
  <Col md={12} xl={3} lg={6} xs={12}>
    <Card>
      <CardBody className="dashboard__booking-card">
        <div className="dashboard__booking-total-container">
          <h5 className="dashboard__booking-total-title dashboard__booking-total-title--red">{logistics} Ways</h5>
          {/* <TrendingUpIcon className="dashboard__trend-icon" /> */}
        </div>
        <h5 className="dashboard__booking-total-description">Total Collection Ways</h5>
        <div className="progress-wrap progress-wrap--small progress-wrap--pink-gradient progress-wrap--rounded">
          <p className="dashboard__booking-card-progress-label progress__label">78%</p>
          <Progress value={78} />
        </div>
      </CardBody>
    </Card>
  </Col>
);

export default TotalCollectionWays;
