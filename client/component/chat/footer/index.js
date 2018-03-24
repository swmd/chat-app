import React, { Component } from 'react';
import io from "socket.io-client";
const socket = io(`${window.location.origin}`);
export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      msg: ''
    }
  }

  _onChangeHandler(e) {
    this.setState({ msg: e.target.value });
  }

  onSubmitMessages(e) {
    if (e.charCode == 13) {
      e.preventDefault();
      e.stopPropagation();
      if (e.nativeEvent.shiftKey) {
        const { messages } = this.state;
        messages.push(e.target.value);
        this.setState({ messages: messages, msg: '' });

      } else {
        const { messages, msg } = this.state;
        const { currentUser } = this.props;

        this.setState({ msg: '', messages: [] });
        if (msg != '') messages.push(msg);
        const data = { message: messages, userID: currentUser._id, userName: currentUser.userName }
        socket.emit('SEND_MESSAGE', { ...data });
      }
    }
  }

  render() {
    const { messages, msg } = this.state;
    return (
      <div className="col-xs-8 col-sm-10 col-sm-push-2 footer">
        <div className="message-input">
          {messages.map((msg, key) => {
            return (<p key={key}>{msg}</p>)
          })}
          <input type="text" name="message" placeholder="Your message" className="form-control" value={msg}
            onKeyPress={this.onSubmitMessages.bind(this)} onChange={this._onChangeHandler.bind(this)} />
        </div>
      </div>
    );
  }
}