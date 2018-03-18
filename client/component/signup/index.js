import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from 'react-router';
import axios from 'axios';
import * as userAction from '../../actions/users';
import { isNull } from 'util';

function formValidation(field, value1, value2) {
  switch (field) {
    case 'userName':
      var nameValid = value1 !== '';
      return nameValid ? false : 'User name must not be empty';
    case 'email':
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(value1) ? false : "Invalid email format!";
    case 'pass':
      if (!value1) return 'Password must not be empty'
      var passwordValid = value1.length >= 8;
      return passwordValid ? false : ' Password is too short!';
    case 'confirmPass':
      var passwordConfirmationValid = value1 === value2;
      return passwordConfirmationValid ? false : 'Password mismatch!';
    case 'address':
      var valid = value1 !== '';
      return valid ? false : 'Address must not be empty';
    case 'gender':
      var valid = value1 !== '';
      return valid ? false : 'Gender must not be empty';
    case 'birthday':
      var valid = value1 !== '';
      return valid ? false : 'Birthday must not be empty';
    default:
      return false;

  }
}

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      pass: null,
      confirmPass: null,
      userName: null,
      error: null,
      e_complete: false,
      u_complete: false,
      message: null,
      address: null,
      gender: "male",
      birthday: null
    }
  }

  componentWillMount() {
    const { currentUser, error } = this.props
    if (!error && currentUser) browserHistory.push('/login')
  }

  componentWillReceiveProps(nextProps) {
    if (!isNull(nextProps.verify)) browserHistory.push('/login')
  }

  _onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  checkEmail() {
    const { email } = this.state;
    if (!email) return this.setState({ error: "Please Input email!" });
    let error = formValidation("email", email);
    if (error) return this.setState({ error: error });

    axios.post('http://localhost:3030/checkEmail', { email })
      .then((res) => {
        if (res.data.exist) {
          this.setState({ error: "This email is already registered!", e_complete: false, message: null });
        } else {
          this.setState({ e_complete: true, message: "Available Email!", error: null });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ e_complete: false });
      });

  }

  checkUserName() {

    const { userName } = this.state;
    if (!userName) return this.setState({ error: "Please Input user name!" });
    let error = formValidation("userName", userName);
    if (error) return this.setState({ error: error });


    axios.post('http://localhost:3030/checkUserName', { userName })
      .then((res) => {
        if (res.data.exist) {
          this.setState({ error: "This user name is already registered!", u_complete: false, message: null })
        } else {
          this.setState({ u_complete: true, message: "Avalable user name!", error: null });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ u_complete: false });
      });
  }

  loginHandler() { browserHistory.push('/login') }

  signUpHandler() {
    const { email, pass, confirmPass, userName, e_complete, u_complete, address, gender, birthday } = this.state;
    const userInfo = { email, pass, confirmPass, userName, address, gender, birthday };
    const keys = Object.keys(userInfo);
    for (var i = 0; i < keys.length; i++) {
      let error = formValidation(keys[i], userInfo[keys[i]], userInfo.pass);
      if (error) {
        this.setState({ error });
        return;
      }
    }
    if (e_complete && u_complete) this.props.SignUp(userInfo);
    else this.setState({ error: "Please check email and user name!", message: null })
  }

  render() {
    const { email, pass, error, confirmPass, userName, message, address, gender, birthday } = this.state;
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

              {
                message ? (
                  <div className="alert alert-success">
                    {message}
                  </div>
                ) : null
              }
              <div className="form-group field">
                <div style={{ position: "relative", width: "80%", display: "inline-block" }} >
                  <span className="glyphicon air-icon-user" style={{ top: "33%" }}></span>
                  <input type="email" name="email" placeholder="Your email" className="form-control" onChange={this._onChangeHandler.bind(this)} value={email} />
                </div>
                <div style={{ width: "20%", display: "inline-block", position: "relative", top: "-1" }}>
                  <a className="btn btn-default" onClick={this.checkEmail.bind(this)}> Check</a>
                </div>
              </div>
              <div className="form-group field">
                <div style={{ position: "relative", width: "80%", display: "inline-block" }} >
                  <span className="glyphicon air-icon-user" style={{ top: "33%" }} ></span>
                  <input type="text" name="userName" placeholder="User Name" className="form-control" onChange={this._onChangeHandler.bind(this)} value={userName} />
                </div>
                <div style={{ width: "20%", display: "inline-block", position: "relative", top: "-1" }}>
                  <a className="btn btn-default" onClick={this.checkUserName.bind(this)}> Check</a>
                </div>
              </div>

              <div className="form-group field">
                <span className="glyphicon air-icon-kids"></span>
                <input type="text" name="address" placeholder="Your address" className="form-control" onChange={this._onChangeHandler.bind(this)} value={address} />
              </div>

              <div className="form-group field">
                <select className="form-control" name="gender" placeholder="Gender" onChange={this._onChangeHandler.bind(this)} value={gender}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="form-group field">
                <span className="glyphicon air-icon-calendar-over6months"></span>
                <input type="date" name="birthday" placeholder="Your address" className="form-control" onChange={this._onChangeHandler.bind(this)} value={birthday} />
              </div>

              <div className="form-group field">
                <span className="glyphicon air-icon-password"></span>
                <input type="password" name="pass" placeholder="Your password" className="form-control" onChange={this._onChangeHandler.bind(this)} value={pass} />
              </div>

              <div className="form-group field">
                <span className="glyphicon air-icon-password"></span>
                <input type="password" name="confirmPass" placeholder="Confirm pasword" className="form-control" onChange={this._onChangeHandler.bind(this)} value={confirmPass} />
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
    currentUser: state.users.currentUser,
    error: state.users.error,
    verify: state.users.verify
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);