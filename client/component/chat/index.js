import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from 'react-router';
import ReactNotifications from 'react-browser-notifications';
import Platform from 'react-platform-js'
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
      messages: [],
      unread: true,
      newMsg:{}
    };
    this.showNotifications = this.showNotifications.bind(this);
    this.handleClick = this.handleClick.bind(this);
    socket.emit('GET_ALL_MESSAGES');
  }
  showNotifications() {
    if (this.n.supported()) this.n.show();
  }

  handleClick(event) {
    this.n.close(event.target.tag);
  }
  componentWillMount() {

    socket.on('RECEIVE_ALL_MESSAGE', (messages) => {
      this.setState({ messages: messages });
    });

    socket.on('RECEIVE_MESSAGE', (data) => {
      const { messages } = this.state;
      messages.push(data);
      this.setState({ messages: messages, newMsg: data }, this.showNotifications);
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
  componentDidMount() {

  }

  render() {
    const { messages ,newMsg} = this.state;
    return (
      <div className="main" >
        <Header />
        <div className="container-fluid">
          <Room messages={messages} />
          <SideBar />
          <Footer currentUser={this.props.currentUser} />
        </div>
        <ReactNotifications
          onRef={ref => (this.n = ref)} // Required
          title={newMsg.userName} // Required
          body={newMsg.message}
          icon="icon.png"
          tag="abcdef"
          timeout="2000"
          onClick={event => this.handleClick(event)}
        />
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


