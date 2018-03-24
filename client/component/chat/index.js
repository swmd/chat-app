import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from 'react-router';
import { logOutUser } from '../../actions/users';

import Header from './header';
import SideBar from './sidebar';
import Room from './room';
import Footer from './footer';
import io from "socket.io-client";
const socket = io(`${window.location.origin}`);

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    socket.emit('GET_ALL_MESSAGES');
  }
  componentWillMount() {

    socket.on('RECEIVE_ALL_MESSAGE',  (messages)=> {
      this.setState({messages:messages});
    });

    socket.on('RECEIVE_MESSAGE', (data) => {
      const { messages } = this.state;
      messages.push(data);
      this.setState({ messages: messages });
    });

    if (!this.props.currentUser) {
      browserHistory.push('/login');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.currentUser) {
      browserHistory.push('/login');
    }
  }

  render() {
    const { messages } = this.state;
    return (
      <div className="main" >
        <Header />
        <div className="container-fluid">
          <Room messages={messages} />
          <SideBar />
          <Footer currentUser={this.props.currentUser} />
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