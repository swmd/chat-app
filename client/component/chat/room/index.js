import React, { Component } from 'react';

export default class Room extends Component {
  constructor(props) {
    super(props);
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
                  <strong>{msg.userName} : </strong>
                  {msg.message}
                </p>
              </div>
            </div>
          )
        }))}
      </div>
    );
  }
}