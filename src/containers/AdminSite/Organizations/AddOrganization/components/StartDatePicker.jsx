import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import '../../../../../scss/component/date-time-picker.scss';
import { CHANGE_START_DATE } from '../../../../../redux/actions/apiActions/ActionTypes';

class StartDatePicker extends PureComponent {
  static propTypes = {
    changeStartDate: PropTypes.func.isRequired,
  };

  state = {
    startDate: new Date(),
  }

  handleChange = (date) => {
    this.setState({ startDate: date });
    this.props.changeStartDate(date.toISOString());
  }

  render() {
    return (
      <div className="form__form-group">
        <span className="form__form-group-label">Joined Date</span>
        <div className="form__form-group-field">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            // showTimeSelect
            // timeFormat="HH:mm"
            // timeCaption="time"
            // timeIntervals={15}
            // dateFormat="MMMM d, yyyy h:mm aa"
            dateFormat="MMMM d, yyyy"
          />
        </div>
        <Field
          style={{ display: 'none' }}
          name="startDate"
          component="input"
          type="text"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: { startDate: state.organizations.startDate },
});

const mapDispatchToProps = dispatch => ({
  changeStartDate: date => dispatch({
    type: CHANGE_START_DATE,
    payload: date,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'newOrgantionStartDatePicker',
  enableReinitialize: true,
})(StartDatePicker));
