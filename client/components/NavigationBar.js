import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { logout } from '../actions/authActions';

class NavigationBar extends Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <div className="navbar-text">
            <strong>{user.username}</strong>
          </div>
        </li>
        <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
      </ul>
    );
    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="signup">Sign up</Link></li>
        <li><Link to="login">Login</Link></li>
      </ul>
    )

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">Authenticated App</Link>
          </div>

          <div className="collapse navbar-collapse">
            { isAuthenticated ? userLinks : guestLinks }
          </div>
        </div>
      </nav>
    );
  }

}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps, { logout })(NavigationBar);
