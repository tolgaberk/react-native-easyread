/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import MessageTypes from './Types';

class Message {
  static addMessageType(type) {
    MessageTypes[type] = type;
  }

  constructor(message = { type: MessageTypes.NOOP, data: {} }) {
    const { type, data } = message;
    if (MessageTypes[type]) {
      this.type = type;
      this.data = data;
    } else {
      throw new Error(`TYPE MUST BE ONE OF ${JSON.stringify(MessageTypes)}`);
    }
  }

  send(data) {
    if (data) {
      this.data = { ...this.data, ...data };
    }
    if (window.sendConfirmation) {
      console.log(this);
    }
    window.ReactNativeWebView.postMessage(JSON.stringify(this));
  }
}

export default Message;
