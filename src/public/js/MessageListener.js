/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import MessageTypes from './Classes/Types';
import Message from './Classes/Message';

class MessageListener {
  static MessageListeners = [];

  static on(type = 'NOOP', handler = () => {}) {
    if (MessageTypes[type]) {
      const time = Date.now();
      const listener = {
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
      return listener.remove;
    }
    throw new Error(
      `TYPE MUST BE ONE OF ${JSON.stringify(Object.keys(MessageTypes))}`,
    );
  }

  static onReactNativeMessage({ data: ReactNativeMessage }) {
    const message = new Message(ReactNativeMessage);
    if (window.sendConfirmation) {
      new Message({ type: MessageTypes.CONFIRMATION, data: message }).send();
    }
    MessageListener.emitMessage(message);
  }

  static emitMessage(message) {
    const { type, data } = message;
    if (type && MessageTypes[type]) {
      // eslint-disable-next-line no-restricted-syntax
      for (const listener of MessageListener.MessageListeners) {
        if (listener.type === type) {
          listener.handler(data);
        }
      }
    } else {
      throw new Error(
        `${type} TYPE MUST BE ONE OF ${JSON.stringify(
          Object.keys(MessageTypes),
        )}`,
      );
    }
  }
}
export default MessageListener;
