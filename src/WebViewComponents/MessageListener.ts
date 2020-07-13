import { WebViewMessageEvent } from 'react-native-webview';
import Types from '../constants/Types';
import Message from './Message';

interface Listener {
  type: string;
  id: number;
  handler: CallableFunction;
  remove: VoidFunction;
}

class MessageListener {
  static MessageListeners: Listener[] = [];

  static onMessage({ nativeEvent: { data } }: WebViewMessageEvent): void {
    const message = new Message(JSON.parse(data));
    // eslint-disable-next-line no-restricted-syntax
    for (const listener of MessageListener.MessageListeners) {
      if (listener.type === message.type) {
        listener.handler(message.data);
      }
    }
  }

  static on(type = 'NOOP', handler: CallableFunction = () => {}): VoidFunction {
    if (Types[type]) {
      const time = Date.now();
      const listener: Listener = {
        type,
        handler,
        id: time,
        remove: () => {
          const Listeners = MessageListener.MessageListeners;
          MessageListener.MessageListeners = Listeners.filter(
            (item) => item.id !== time,
          );
        },
      };
      MessageListener.MessageListeners.push(listener);
      console.log(MessageListener.MessageListeners);
      return listener.remove;
    }
    throw new Error(
      `TYPE MUST BE ONE OF ${JSON.stringify(Object.keys(Types))}`,
    );
  }
}

export default MessageListener;
