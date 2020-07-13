import { DocumentController, WindowController } from './js/WindowEvents';
import MessageListener from './js/MessageListener';
import Types from './js/Types';
import Message from './js/Message';

WindowController.setOnLoad(() => {
  document.querySelector('#root').innerHTML = 'NBR';
  new Message({ type: Types.ON_LOAD }).send();
  MessageListener.on(Types.NOOP, () => {
    alert('mesaj alindi');
  });
});
