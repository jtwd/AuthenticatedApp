import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import SignupForm from './SignupForm'
import { userSignupRequest } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';


class SignupPage extends React.Component {
  render() {
    const {
      userSignupRequest,
      addFlashMessage } = this.props;

    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SignupForm
            userSignupRequest={userSignupRequest}
            addFlashMessage={addFlashMessage}
          />
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
};


export default connect(
  null, // map state to props
  {
    userSignupRequest,
    addFlashMessage,
  } // map dispatch to props (actions)
)(SignupPage);