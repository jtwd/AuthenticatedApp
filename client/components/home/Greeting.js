import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Greeting = ({ isAuthenticated, title}) => {

  const login = (
    <div>
      <h1>{title}</h1>
      <p>You need to be logged in to use this app.</p>
      <Link to="login" className="btn btn-primary btn-lg">Login</Link><br /><br />
      <p>Or <Link to="signup"><strong>Sign up</strong></Link> for an account</p>
    </div>
  );

  const loggedIn = (
    <div>
      <h1>Welcome back!</h1>
      <p>You are logged in. Now you can use the app</p>
      <Link to="new-event" className="btn btn-primary btn-lg">Use this thing!</Link>
    </div>
  )


  return (
    <div className="jumbotron">
      { isAuthenticated ? loggedIn : login }
    </div>
  )
};

Greeting.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Greeting;