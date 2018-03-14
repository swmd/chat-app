import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from 'react-router';
import * as userAction from '../../actions/users';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  loginHandler() {
    this.props.setCurrentUser((status) => {
      if (status) {
        browserHistory.push('/dashboard')
      }
    });
  }

  render() {
    return (
      <div className="container main">
        <div className="col-md-offset-4 col-md-4 login-form">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3>Login</h3>
            </div>
            <div className="panel-body">
              <input type="email" name="email" placeholder="Email" className="form-control" />
              <input type="password" name="pass" placeholder="Password" className="form-control"/>
              <a className="btn btn-default" onClick={this.loginHandler.bind(this)}> Login</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(userAction, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);