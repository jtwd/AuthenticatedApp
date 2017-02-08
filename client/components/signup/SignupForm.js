/**
 * Created by Jamest on 08/02/2017.
 */

import React, {PropTypes, Component} from 'react';
import map from 'lodash/map';
import classnames from 'classnames';
//import browserHistory from 'react-router';

import timezones from '../../data/timezones';
import validateInput from '../../../server/shared/validations/signup';

import TextFieldGroup from '../common/TextFieldGroup';


class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const ele = e.target;
    this.setState({[ele.name]: ele.value});
  }

  isValid() {
    const { errors, isValid} = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({errors: {}, isLoading: true}); // reset errors for re-validation
      this.props.userSignupRequest(this.state) // returns a promise
        .then(
          () => {
            this.props.addFlashMessage({
              type: 'success',
              text: 'You successfully signed up. Welcome!'
            });
            this.context.router.push('/');
          },
          ({data}) => this.setState({errors: data, isLoading: false}) // put errors on state
        );
    }
  }

  render() {
    const { errors } = this.state;
    const options = map(timezones, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Sign up</h1>

        <TextFieldGroup
          error={errors.username}
          field="username"
          value={this.state.username}
          label="Username"
          onChange={this.onChange} />

        <TextFieldGroup
          error={errors.email}
          field="email"
          value={this.state.email}
          label="Email"
          type="email"
          onChange={this.onChange} />

        <TextFieldGroup
          error={errors.password}
          field="password"
          value={this.state.password}
          label="Password"
          type="password"
          onChange={this.onChange} />

        <TextFieldGroup
          error={errors.passwordConfirmation}
          field="passwordConfirmation"
          value={this.state.passwordConfirmation}
          label="Confirm Password"
          type="password"
          onChange={this.onChange} />

        <div className={classnames("form-group", { 'has-error': errors.timezone})}>
          <label className="control-label">Timezone</label>
          <select
            className="form-control"
            name="timezone"
            onChange={this.onChange}
            value={this.state.timezone}
          >
            <option value="">Select your timezone</option>
            {options}
          </select>
          {errors.timezone && <span className="help-block">{errors.timezone}</span>}
        </div>

        <div className="form-group">
          <button disabled={this.state.isLoading} className="btn btn-primary btn-large">Sign up</button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
};

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default SignupForm;