/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable space-in-parens */

import React from 'react';
import { Col, Card, CardBody, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { FaDownload } from 'react-icons/fa';
import Select from 'react-select';
import CryptoJS from 'crypto-js';

import { getOrganizationList } from '../../../../redux/actions/apiActions/organizationActions';
import { addNewReport } from '../../../../redux/actions/apiActions/ReportsActions';
import CreateQuarterModal from './CreateQuarterModal';
import Generation from './Generation';
import TrendLineGraph from './TrendLineGraph';
import ItemsFound from './ItemsFound';
import Composition from './Composition';
import TotalComposition from './TotalComposition';
import CreateSummaryForm from './CreateSummaryForm';
import Summary from './Summary';
import about from '../../../../shared/img/background/about.png';
import kids from '../../../../shared/img/background/kids.png';

// const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
//   'July', 'August', 'September', 'October', 'November', 'December',
// ];

const WASTES = {
  Papers: 'Paper',
  Plastics: 'Plastic',
  Cans: 'Can',
  Glasses: 'Glass',
  'E-waste': 'E-waste',
  Organic: 'Organic',
};

class ReportingForm extends React.Component {
  state = {
    organization: null,
    data: {},
    generationData: null,
    trendlineData: null,
    totalCompositionData: null,
    findings: null,
    recommendations: null,
    reportId: null,
    reportData: null,
  }

  componentWillMount() {
    this.props.getOrganizationList();
  }

  sortNumber = (a, b) => console.log(a - b)

  createQuarter = (value) => {
    // const data = {};
    // let ways = [];
    // for (const key in value.ways) {
    //   ways = ways.concat(value.ways[key]);
    // }
    // data[value.quarter] = ways;
    this.createGenerationData(value);
    this.setState({
      data: value,
    });
  }

  sortCompositionData = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const valueA = a.value;
    const valueB = b.value;
    let comparison = 0;
    if (valueA < valueB) {
      comparison = 1;
    } else if (valueA > valueB) {
      comparison = -1;
    }
    return comparison;
  }

  sortTrendlineData = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const valueA = new Date(a.date);
    const valueB = new Date(b.date);
    let comparison = 0;
    if (valueA > valueB) {
      comparison = 1;
    } else if (valueA < valueB) {
      comparison = -1;
    }
    return comparison;
  }

  createGenerationData = (value) => {
    const data = value.ways;
    console.log(value);
    const generationData = {};
    const trendlineData = {};
    let totalCompositionData = {};
    // let totalKg = 0;
    let maxMonth = null;
    let minMonth = null;
    const dates = [];

    // // calculate total weight and create data for bar chart
    for (const quarter in data) {
      generationData[quarter] = {};
      for (const key in data[quarter]) {
        // Calculate Min Month and Max Month
        if (maxMonth === null || minMonth === null) {
          const monthDate = new Date(key);
          monthDate.setDate(2);
          maxMonth = monthDate;
          minMonth = monthDate;
        } else {
          if (maxMonth < new Date(key)) {
            const monthDate = new Date(key);
            monthDate.setDate(2);
            maxMonth = monthDate;
          }
          if (minMonth > new Date(key)) {
            const monthDate = new Date(key);
            monthDate.setDate(2);
            minMonth = monthDate;
          }
        }

        const firstDate = new Date(key).toLocaleDateString();
        if (!dates.includes(firstDate)) {
          dates.push(firstDate);
        }
        const productTypes = {};
        let tmp = [];
        generationData[quarter][key] = { total: 0 };
        for (let i = 0; i < data[quarter][key].length; i += 1) {
          let date = new Date(data[quarter][key][i].pickUpTime);
          date.setDate(1);
          date = date.toLocaleDateString();

          // if (!dates.includes(date)) {
          //   dates.push(date);
          // }
          for (let j = 0; j < data[quarter][key][i].items.length; j += 1) {
            // totalKg += data[key][i].items[j].quantity;

            const { productType } = data[quarter][key][i].items[j];

            generationData[quarter][key].total += data[quarter][key][i].items[j].quantity; // total weight calculation

            // Create Generation Data
            if (!Object.keys(productTypes).includes(productType)) {
              productTypes[productType] = Object.keys(productTypes).length;
              tmp.push({
                name: WASTES[productType],
                value: parseFloat(data[quarter][key][i].items[j].quantity.toFixed(2)),
              });
            } else {
              // eslint-disable-next-line operator-assignment
              tmp[productTypes[productType]].value += data[quarter][key][i].items[j].quantity;
              tmp[productTypes[productType]].value =
              parseFloat((tmp[productTypes[productType]].value).toFixed(2));
            }

            // Create Trendline Data
            const quantity = parseFloat(data[quarter][key][i].items[j].quantity.toFixed(2));
            if (!Object.keys(trendlineData).includes(productType)) {
              totalCompositionData[productType] = quantity;
              trendlineData[productType] = { data: [{ date, value: quantity }], total: quantity };
            } else {
              let dateContained = false;
              totalCompositionData[productType] += quantity;
              for (let k = 0; k < trendlineData[productType].data.length; k += 1) {
                if (trendlineData[productType].data[k].date === date) {
                  trendlineData[productType].data[k].value += quantity;
                  trendlineData[productType].data[k].value = parseFloat(trendlineData[productType].data[k].value.toFixed(2));
                  trendlineData[productType].total += quantity;
                  trendlineData[productType].total = parseFloat(trendlineData[productType].total.toFixed(2));
                  dateContained = true;
                  break;
                }
                // else {
                //   trendlineData[productType].data.push({ date, value: data[key][i].items[j].quantity });
                //   trendlineData[productType].total += data[key][i].items[j].quantity;
                //   break;
                // }
              }
              if (dateContained === false) {
                trendlineData[productType].data.push({ date, value: quantity });
                trendlineData[productType].total += quantity;
                trendlineData[productType].total = parseFloat(trendlineData[productType].total.toFixed(2));
              }
            }
          }
        }
        generationData[quarter][key].chartData = tmp;
        tmp = [];
      }
    }

    // Adding 0 data
    for (const key in trendlineData) {
      const tmp = [];
      for (let i = 0; i < trendlineData[key].data.length; i += 1) {
        tmp.push(trendlineData[key].data[i].date);
      }
      const filteredDate = dates.filter(item => !tmp.includes(item));
      for (const date in filteredDate) {
        trendlineData[key].data.push({ date: filteredDate[date], value: 0 });
      }
      trendlineData[key].data.sort(this.sortTrendlineData);
    }

    const tmp = [];

    for (const key in totalCompositionData) {
      tmp.push({
        name: WASTES[key],
        value: totalCompositionData[key],
      });
    }
    totalCompositionData = tmp;

    totalCompositionData.sort(this.sortCompositionData);

    let reportTitle = '';
    for (let i = 0; i < Object.keys(data).length; i += 1) {
      reportTitle = `${reportTitle}${Object.keys(data)[i].split('(')[0]}${i + 1 !== Object.keys(data).length ? ' and ' : ''}`;
    }

    const reportData = {
      data: value,
      reportTitle,
      organization: this.state.organization.value,
      reportDate: new Date(),
      auditStartDate: minMonth,
      generationData,
      trendlineData,
      totalCompositionData,
      minMonth,
      maxMonth,
    };

    // console.log(generationData);
    // console.log(trendlineData);
    // console.log(totalCompositionData);

    this.setState({
      generationData,
      trendlineData,
      totalCompositionData,
      reportData,
    });
  }

  savePdf = (data) => {
    console.log(data);
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123');
    const link = ciphertext.toString().replace(/\//gi, 'SLASH');
    addNewReport({
      organization: this.state.organization.value._id,
      title: data.reportTitle,
      data: link,
    }).then((response) => {
      this.setState({
        reportId: response.data._id,
      });

      // downloadPdf(response.data._id);
      // const opts = {
      //   uri: 'https://api.sejda.com/v2/html-pdf',
      //   headers: {
      //     Authorization: `Token: ${'api_62FC618F2C484B9ABBEF48B79C32E92F'}`,
      //   },
      //   json: {
      //     url: `https://recyglo.info/pdf_report/${response.data._id}`,
      //     viewportWidth: 1200,
      //   },
      // };
      // window.open(`/pdf_report/${response.data._id}`, '_blank');
    });
  }

  downloadPdf = () => {
    const { reportId } = this.state;
    if (reportId) {
      // window.open(`/pdf_report/${reportId}`, '_blank');
      window.open(`https://www.sejda.com/html-to-pdf?save-link=https://recyglo.info/pdf_report/${reportId}&pageSize=legal&viewportWidth=1440&pageOrientation=landscape`);
    }
  }

  createSummary = (value) => {
    const { findings, recommendations } = value;
    const { reportData } = this.state;
    reportData.findings = findings;
    reportData.recommendations = recommendations;
    this.savePdf(reportData);
    this.setState({
      findings,
      recommendations,
      reportData,
    });
  }

  handleOrganizationChange = (value) => {
    this.setState({
      organization: value,
    });
  }

  render() {
    const {
      organization,
      data,
      generationData,
      trendlineData,
      totalCompositionData,
      findings,
      recommendations,
    } = this.state;
    const { organizations } = this.props;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <form className="form form--horizontal">
              <div className="form__form-group">
                <span className="form__form-group-label"><img alt="about" src={about} /></span>
                <div className="form__form-group-field">
                  <div className="form__form-group-input-block"><h4>About Report</h4>
                    <br />
                    <p>Our Waste Management Report identifies, quantifies, and analyses the composition of the waste stream generated to ensure compliance with the requirements suggested by the ISO 14001-2015 requirement, YCDC, and regional environmental agencies in South East Asia. Our audit methodology collects your waste through bins and we provide you with feedback on the gathered data. Waste audit quarter reports are performed quarterly since the starting date of the contract.</p>
                    <br />
                    <p> We illustrate with figures the collected weight and percentage of each type of waste and the total amount of all the categories reflected in the audit for a better understanding of waste trends and facilitate decision-making on office policies.</p>
                    <br />
                    <p>You can download the resulting quarterly reports containing the quantity and quality of the recyclable waste in a combination of formats including graphs, charts, and spreadsheets. We also provide you with general recommendations to improve the waste management at the workplace</p>
                    <br />
                    <p>We very much welcome your feedback! If you have any suggestion or would love to have any more data reflected on our dashboard let us know at <a href="mailto:contact@recyglo.com">contact@recyglo.com</a> or <a href="tel:+959404245800">+95-9-40424-5800</a>.</p>
                  </div>
                </div>
              </div>
            </form>
            <div className="animation-block">
              <h1 className="heading-animation">
                IDENTIFICATION
              </h1>
              <h1 className="heading-animation2">
                ANALYSIS
              </h1>
              <h1 className="heading-animation">
                QUANTIFICATION
              </h1>
            </div>
            <div className="report-block">
              <div className="report-blockmini">
                <h3>Get Started</h3>
                <div className="form__form-group-input-wrap">
                  {organizations &&
                    <Select
                      name="organizations"
                      value={organization}
                      onChange={this.handleOrganizationChange}
                      options={organizations.list
                        && organizations.list.map((prop, key) => (
                        // eslint-disable-next-line no-underscore-dangle
                        { key, label: prop.name, value: prop }
                        ))
                      }
                      clearable={false}
                      className="react-select"
                      placeholder="Choose Customer"
                      classNamePrefix="react-select"
                    />
                  }
                  <br />
                  {organization &&
                    <CreateQuarterModal
                      organization={organization.value._id}
                      createQuarter={this.createQuarter}
                    />
                  }
                </div>
              </div>
            </div>
            <hr />
            {JSON.stringify(data) !== '{}' && generationData &&
              <Generation data={generationData} title={data.quarter} organization={organization.value.name} />
            }
            {trendlineData &&
              <TrendLineGraph data={trendlineData} months={Object.keys(data.ways)} organization={organization.value.name} />
            }
            {JSON.stringify(data) !== '{}' &&
              <ItemsFound data={data} reportDate={new Date()} />
            }
            {JSON.stringify(data) !== '{}' && generationData &&
              <Composition data={generationData} title={data.quarter} />
            }
            {JSON.stringify(data) !== '{}' && generationData &&
              <TotalComposition months={Object.keys(data.ways)} organization={organization.value.name} data={totalCompositionData} quarter={data.quarter} />
            }
            {JSON.stringify(data) !== '{}' && findings && recommendations &&
              <Summary
                organization={organization.value.name}
                auditStartDate={Object.keys(data.ways)[0]}
                findings={findings}
                recommendations={recommendations}
                months={Object.keys(data.ways).length}
              />
            }
            {JSON.stringify(data) !== '{}' &&
              <Button className="icon" color="success" onClick={() => this.downloadPdf()}>
                <p>
                  <FaDownload /> Download Report
                </p>
              </Button>
            }
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getOrganizationList: () => {
    dispatch(getOrganizationList());
  },
});

const mapStateToProps = state => ({
  organizations: state.organizations,
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportingForm);
