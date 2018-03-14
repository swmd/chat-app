import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from 'react-router';
import DropzoneComponent from 'react-dropzone-component';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attachments: [],
      djsConfig: {
        addRemoveLinks: true,
        sendingmultiple: true,
        maxFilesize: 30,
        maxFiles: 20
      },
      componentConfig: {
        postUrl: '/upload',
      },
      dropzone: null
    }
  }
  componentWillMount() {
    if (this.props.currentUser) {
      browserHistory.push('/login');
    }
  }
  render() {
    const { componentConfig, eventHandlers, djsConfig } = this.state;
    return (
      <div className="container main" >
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3> 💝 FILEUPLOAD USING DROPZONE 🎀 </h3>
          </div>
          <div className="panel-body">
            <DropzoneComponent config={componentConfig} eventHandlers={eventHandlers} djsConfig={djsConfig} />
          </div>
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
    currentUser: state.currentUser
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoard);