/* eslint-disable no-restricted-syntax */
import Controllers from './WindowEvents';
import MessageListener from './MessageListener';
import Types from './Classes/Types';
import Message from './Classes/Message';
import Paragraph from './Classes/Paragraph';
import DocSelection from './Classes/Selection';
import './helpers/Marker';

Controllers.WindowController.setOn('onload', () => {
  new Message({ type: Types.ON_LOAD }).send();

  MessageListener.on(Types.ON_LOAD, (paragraphs) => {
    for (const paragraph of paragraphs) {
      const paragraphObj = new Paragraph(paragraph);
      console.log(paragraphObj);
      paragraphObj.createElement();
      paragraphObj.appendToRoot();
    }
  });
});

Controllers.DocumentController.setOn('onselectionchange', (e) => {
  console.log(e);
  const selection = new DocSelection();
  new Message({
    type: Types.ON_SELECTION_CHANGE,
    data: selection.prepForReactNative(),
  }).send();
});
