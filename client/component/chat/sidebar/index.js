import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Gravatar from 'react-gravatar';
import axios from 'axios';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
    this.getUserList();
  }
  getUserList() {
    if (this.props.currentUser)
      axios.post(`${window.location.origin}/getUserList`)
        .then((response) => {
          this.setState({ users: response.data.userList });
        })
        .catch((error) => {
        });
  }

  getUserTemplate(user, key) {
    return (
      <a className="lsit-group-item" key={key}>
        <div className="row" >
          <div className="col-md-12">
            <div style={{ width: "30%", display: "inline-block", position: "relative", top: "-5px", left: "7px" }}>
              <Gravatar title={user.userName} email={user.email} size={50} style={{ borderRadius: 25, borderWidth: 1, borderColor: "#ddd" }} />
            </div>
            <div style={{ width: "70%", display: "inline-block", position: "relative", top: "5px" }} >
              <div>
                <strong>{user.userName}</strong>
              </div>
              <div>
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    )
  }

  render() {
    const { users } = this.state;
    return (
      <div className="col-xs-4 col-sm-2 col-sm-pull-10 sidebar-offcanvas">
        <div className="sidebar-header">
          <h5 className="list-group-item active">Users</h5>
        </div>
        <div className="list-group sidenav">
          {users.map((user, key) => this.getUserTemplate(user, key))}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.users.currentUser
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);