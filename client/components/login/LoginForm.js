import React, { PropTypes } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';

import { login } from '../../actions/authActions';
import validateInput from '../../../server/shared/validations/login';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false,
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if(!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if(this.isValid()) {
      this.setState({ errors: {}, isLoading: true});
      this.props.login(this.state).then(
        (res) => this.context.router.push('/'),
        (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  }

  onChange(e) {
    const ele = e.target;
    this.setState({ [ele.name]: ele.value});
  }

  render() {
    const { errors, identifier, password, isLoading } = this.state;

    let identifierError = "";
    let passwordError = "";

    if(typeof errors !== "undefined") {
      if (typeof errors.identifier !== "undefined") {
        identifierError = errors.identifier;
      }
      if (typeof errors.password !== "undefined") {
        passwordError = errors.password;
      }
    }

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        { errors.form && <div className="alert alert-danger">{errors.form}</div> }

        <TextFieldGroup
          field="identifier"
          value={identifier}
          label="Username/Email"
          error={identifierError}
          onChange={this.onChange} />

        <TextFieldGroup
          field="password"
          value={password}
          label="Password"
          type="password"
          error={passwordError}
          onChange={this.onChange} />

        <div className="form-group">
          <button disabled={isLoading} className="btn btn-primary btn-lg">Login</button>
        </div>

      </form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { login })(LoginForm);