import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from 'react-router';
import * as userAction from '../../actions/users';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      pass: null,
      confirmPass: null,
      userName: null,
      error: null
    }
  }

  _onChangeMailHander() {

  }

  _onChangePassHander() {

  }

  _onConfirmPassHander() {

  }

  _onChangeUserNameHander() {

  }

  loginHandler() {
    browserHistory.push('/login')
  }

  signUpHandler() {

  }

  render() {
    const { email, pass, error, confirmPass, userName } = this.state;
    return (
      <div className="container main">
        <div className="col-md-offset-4 col-md-4 login-form">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3>SignUp</h3>
            </div>
            <div className="panel-body">
              {error ? (
                <div className="alert alert-danger">
                  <strong>Error!</strong> {error}
                </div>
              ) : null}
              <div className="form-group field">
                <span className="glyphicon air-icon-user"></span>
                <input type="email" name="email" placeholder="Your email" className="form-control" onChange={this._onChangeMailHander.bind(this)} value={email} />
              </div>
              <div className="form-group field">
                <span className="glyphicon air-icon-user"></span>
                <input type="email" name="text" placeholder="User Name" className="form-control" onChange={this._onChangeUserNameHander.bind(this)} value={userName} />
              </div>
              <div className="form-group field">
                <span className="glyphicon air-icon-password"></span>
                <input type="password" name="pass" placeholder="Your password" className="form-control" onChange={this._onChangePassHander.bind(this)} value={pass} />
              </div>

              <div className="form-group field">
                <span className="glyphicon air-icon-password"></span>
                <input type="password" name="confirm" placeholder="Confirm pasword" className="form-control" onChange={this._onConfirmPassHander.bind(this)} value={confirmPass} />
              </div>

              <div className="row button-area">
                <div className="col-md-offset-1 col-md-5">
                  <a className="btn btn-success" onClick={this.signUpHandler.bind(this)}> SignUp</a>
                </div>
                <div className="col-md-5">
                  <a className="btn btn-primary" onClick={this.loginHandler.bind(this)}> Cancel</a>
                </div>
              </div>
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
)(SignUp);