import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from 'react-router';
import axios from 'axios';
import * as userAction from '../../actions/users';

class Verify extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null
    }
  }

  componentWillMount() {
    axios.post("http://localhost:3030/verify", this.props.params)
      .then((respone) => {
        if (respone.data.error) {
          this.setState({ error: respone.data.error });
        }
      });
  }

  render() {
    const { error } = this.state;
    if(error){
      return (
        <div className="container main">
          <div className="col-md-offset-4 col-md-4 login-form">
            <div className="alert alert-danger">
              <h4>{error}</h4>
            </div>
          </div>
        </div>
      )
    }else{
      return (
        <div className="container main">
          <div className="col-md-offset-4 col-md-4 login-form">
            <div className="alert alert-success">
              <h4>Verified your account! <a onClick={() => { browserHistory.push('/login') }} >Please login</a></h4>
            </div>
          </div>
        </div>
      )
    }
    
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
)(Verify);