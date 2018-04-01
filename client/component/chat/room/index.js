import React, { Component } from 'react';

export default class Room extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }
  
  render() {
    const { messages } = this.props;
    return (
      <div className="col-xs-8 col-sm-10 col-sm-push-2 main-chat-room">
        {messages.map(((msg, key) => {
          return (
            <div className="row" key={key}>
              <div className="col-md-11" className="left-message">
                <p>
                  <strong>{msg.userName}</strong><br />
                  <strong>{msg.creatAt}</strong><br />
                  {msg.message.map((m, k) => {
                    return (
                      <span style={{ display: "block" }} key={k}>{m}</span>
                    )
                  })}
                </p>
              </div>
            </div>
          )
        }))}
        <div ref={el => { this.el = el; }} />
      </div>
    );
  }
}
