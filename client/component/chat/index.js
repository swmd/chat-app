import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from 'react-router';
import { logOutUser } from '../../actions/users';

import Header from './header';
import SideBar from './sidebar';
import Room from './room';
import Footer from './footer';
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }
  componentWillMount() {
    if (!this.props.currentUser) {
      browserHistory.push('/login');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.currentUser) {
      browserHistory.push('/login');
    }
  }
  addMessage(msg) {
    const { messages } = this.state;
    messages.push(msg);
    this.setState({ messages: messages });
  }
  render() {
    const { messages } = this.state;
    return (
      <div className="main" >
        <Header />
        <div className="container-fluid">
          <Room messages={messages} />
          <SideBar />
          <Footer addMessage={this.addMessage.bind(this)} currentUser={this.props.currentUser} />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logOutUser }, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.users.currentUser
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);