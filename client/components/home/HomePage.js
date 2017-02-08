import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Greeting from './Greeting';


class HomePage extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <Greeting
        isAuthenticated={isAuthenticated}
        title="Authenticated App" />
    )
  }

}

HomePage.propTypes = {
  auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(HomePage);
