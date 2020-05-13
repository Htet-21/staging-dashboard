import React from 'react';
import {
  // Col,
  Container,
  Row,
  Card,
  CardBody,
  // Button,
} from 'reactstrap';
import Stepper from 'react-js-stepper';
import history from '../../../../shared/utils/history';
// import { Slide } from 'react-slideshow-image';
import '../../../../scss/component/trainingslide.scss';


const img1 = `${process.env.PUBLIC_URL}/img/Trainingview/PaperWaste1.png`;
const img2 = `${process.env.PUBLIC_URL}/img/Trainingview/PaperWaste2.png`;
const img3 = `${process.env.PUBLIC_URL}/img/Trainingview/PaperWaste3.png`;
const img4 = `${process.env.PUBLIC_URL}/img/Trainingview/PaperWaste4.png`;
const img5 = `${process.env.PUBLIC_URL}/img/Trainingview/PaperWaste5.png`;
const img6 = `${process.env.PUBLIC_URL}/img/Trainingview/PaperWaste6.png`;
const img7 = `${process.env.PUBLIC_URL}/img/Trainingview/PaperWaste7.png`;
const img8 = `${process.env.PUBLIC_URL}/img/Trainingview/PaperWaste8.png`;
const img9 = `${process.env.PUBLIC_URL}/img/Trainingview/PaperWaste9.png`;
const img10 = `${process.env.PUBLIC_URL}/img/Trainingview/PaperWaste10.png`;
const img11 = `${process.env.PUBLIC_URL}/img/Trainingview/PaperWaste11.png`;
const img12 = `${process.env.PUBLIC_URL}/img/Trainingview/PaperWaste12.png`;

const tutorialSteps = [
  {
    label: 'img1',
    imgPath:
      img1,
  },
  {
    label: 'img2',
    imgPath:
      img2,
  },
  {
    label: 'img3',
    imgPath:
      img3,
  },
  {
    label: 'img4',
    imgPath:
      img4,
  },
  {
    label: 'img5',
    imgPath:
      img5,
  },
  {
    label: 'img6',
    imgPath:
      img6,
  },
  {
    label: 'img7',
    imgPath:
      img7,
  },
  {
    label: 'img8',
    imgPath:
      img8,
  },
  {
    label: 'img9',
    imgPath:
      img9,
  },
  {
    label: 'img10',
    imgPath:
      img10,
  },
  {
    label: 'img11',
    imgPath:
      img11,
  },
  {
    label: 'img12',
    imgPath:
      img12,
  },
];

const steps = [{ title: '' },
  { title: '' },
  { title: '' },
  { title: '' },
  { title: '' },
  { title: '' },
  { title: '' },
  { title: '' },
  { title: '' },
  { title: '' },
  { title: '' },
  { title: '' },
];

// const properties = {
//   duration: 5000,
//   transitionDuration: 500,
//   infinite: true,
//   indicators: true,
//   arrows: true,
//   pauseOnHover: true,
//   onChange: (oldIndex, newIndex) => {
//     console.log(`slide transition from ${oldIndex} to ${newIndex}`);
//   },
// };

class Training extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 1,
    };
  }

  handleOnClickStepper = (step) => {
    this.setState({ activeStep: step });
  }

  handleOnClickNext = () => {
    if (document.getElementById('next').value === 'finish') {
      console.log('finish');
    }
    const nextStep = this.state.activeStep + 1;
    this.setState({ activeStep: nextStep });
  }

  handleOnClickBack = () => {
    const prevStep = this.state.activeStep - 1;
    this.setState({ activeStep: prevStep });
  }

  handleOnClickFinish = () => {
    history.push('/training');
    window.location.reload(true);
  }

  render() {
    return (
      <React.Fragment>
        <Container className="dashboard">
          {/* <Row>
            <Col md={9}>
              <h3 className="page-title">Waste Awareness Training</h3>
            </Col>
          </Row> */}
          <Row>
            <Card>
              <CardBody style={{ alignSelf: 'center' }}>
                <Stepper
                  steps={steps}
                  activeStep={this.state.activeStep}
                  onSelect={this.handleOnClickStepper}
                  showNumber={false}
                />
                <div style={{ marginTop: '40px' }}>
                  <img
                    // src={`../../../../shared/img/Trainingview/${tutorialSteps[this.state.activeStep - 1].label}.png`}
                    src={tutorialSteps[this.state.activeStep - 1].imgPath}
                    alt={tutorialSteps[this.state.activeStep - 1].label}
                    className="training__image"
                  />
                </div>
                <div style={{ marginTop: '40px' }}>
                  <input
                    id="next"
                    style={{ float: 'right' }}
                    className="training__button"
                    type="button"
                    value={this.state.activeStep === steps.length ? 'Finish' : 'Next'}
                    onClick={this.state.activeStep === steps.length ? this.handleOnClickFinish : this.handleOnClickNext}
                  />
                  {this.state.activeStep === 1 ? '' : <input
                    className="training__button"
                    style={{ float: 'left' }}
                    type="button"
                    value="Back"
                    onClick={this.handleOnClickBack}
                  /> }
                </div>
              </CardBody>
            </Card>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Training;
