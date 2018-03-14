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
    this.props.setCurrentUser((status)=>{
        if(status){
          browserHistory.push('/dashboard')
        }
    });
  }

  render() {
    return (
      <div className="panel">
        <div className="panel-header">
          <h4>Login</h4>
        </div>
        <div className="panel-body">
          <input type="email" name="email" />
          <input type="password" name="pass" />
          <a className="btn btn-default" onClick={this.loginHandler.bind(this)}> Login</a>
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