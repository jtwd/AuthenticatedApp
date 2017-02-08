import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createEvent } from '../../actions/eventActions';

import TextFieldGroup from '../common/TextFieldGroup';


class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      error: {},
      isLoading: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const ele = e.target;
    this.setState({ [ele.name]: ele.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createEvent(this.state);
  }

  render() {
    const { title, errors={}, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Create new game event</h1>

        <TextFieldGroup
          field="title"
          value={title}
          label="Event Title"
          onChange={this.onChange}
          error={errors.title} />

        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    )
  }
}

EventForm.propTypes = {
  createEvent: PropTypes.func.isRequired,
}

export default connect(null, {createEvent})(EventForm);