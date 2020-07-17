import MessageTypes from '../constants/Types';
import WebViewController from './WebViewController';

interface Message {
  type: string;
  data: { [propName: string]: unknown };
}

class Message {
  static addMessageType(type: string): void {
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

  send(): void {
    WebViewController.webViewRef.injectJavaScript(`(function(){
        window.dispatchEvent(new MessageEvent('message',{data:${JSON.stringify({
          type: this.type,
          data: this.data,
        })}}))
    })(); true;`);
  }
}

export default Message;
