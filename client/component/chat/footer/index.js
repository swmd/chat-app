import React, { Component } from 'react';
import io from "socket.io-client";
const socket = io('localhost:3030');
export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      msg: ''
    }

    socket.on('RECEIVE_MESSAGE', function (data) {
      props.addMessage(data);
    });

  }

  _onChangeHandler(e) {
    this.setState({ msg: e.target.value });
  }

  onSubmitMessages(e) {
    if (e.charCode == 13) {
      e.preventDefault();
      e.stopPropagation();
      const { msg } = this.state;
      const { currentUser } = this.props;
      const data = { message: msg, ...currentUser }
      socket.emit('SEND_MESSAGE', { ...data });
      this.setState({ msg: '' });
    }
  }

  render() {
    const { messages, msg } = this.state;
    return (
      <div className="col-xs-8 col-sm-10 col-sm-push-2 footer">
        <div className="message-input">
          {messages.map((msg) => {
            <p>{msg}</p>
          })}
          <input type="text" name="message" placeholder="Your message" className="form-control" value={msg}
            onKeyPress={this.onSubmitMessages.bind(this)} onChange={this._onChangeHandler.bind(this)} />
        </div>
      </div>
    );
  }
}