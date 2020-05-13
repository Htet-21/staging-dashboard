/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from './Header';
import Footer from './Footer';
import PieChart from './PieChart';
import '../../../../scss/report/Generation.scss';

const months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

class Composition extends Component {
  state = {
    fixedData: null,
  }
  componentWillMount() {
    const { data } = this.props;
    const fixedData = [];
    const pickUpDates = {};
    for (let i = 0; i < data.length; i += 1) {
      const date = new Date(data[i].pickUpTime);
      const pickUpDate = `1-${months[date.getMonth()]}-${date.getFullYear()}`;
      if (!Object.keys(pickUpDates).includes(pickUpDate)) {
        pickUpDates[pickUpDate] = Object.keys(pickUpDates).length;
        fixedData.push({
          pickUpTime: pickUpDate,
          items: data[i].items,
        });
      } else {
        const items = [];
        items.push(...fixedData[pickUpDates[pickUpDate]].items, ...data[i].items);
        fixedData[pickUpDates[pickUpDate]].items = items;
      }
    }
    for (let i = 0; i < fixedData.length; i += 1) {
      let total = 0;
      for (let j = 0; j < fixedData[i].items.length; j += 1) {
        total += fixedData[i].items[j].quantity;
      }
      fixedData[i].total = total.toFixed(2);
    }
    console.log(fixedData);
    this.setState({
      fixedData,
    });
  }
  render() {
    const { fixedData } = this.state;
    const {
      title, totalPages, currentPage, reportDate,
    } = this.props;
    return (
      <div className="generation-page">
        <Header date={reportDate} />
        <div className="generation-content">
          <div className="generation-title">
            <div style={{ width: '70%', float: 'left' }}>
              <h5>Generation and Recycling</h5>
              <h4>Monthly Waste Collection</h4>
            </div>
            <div style={{ width: '30%' }}>
              <p>{title}</p>
            </div>
          </div>
          <Container className="dashboard">
            <Row>
              {fixedData && fixedData.map((item, key) => (
                <Col key={key} md={6} lg={6} style={{ paddingTop: '20px' }}>
                  <h5 style={{ textAlign: 'center' }}>Waste Composition (%)</h5>
                  <h5 style={{ textAlign: 'center' }}>{months[new Date(item.pickUpTime).getMonth()]}</h5>
                  <PieChart data={item.items} />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
        <Footer totalPages={totalPages} currentPage={currentPage} />
      </div>
    );
  }
}

export default Composition;
