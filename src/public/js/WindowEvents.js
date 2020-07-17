/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import MessageListener from './MessageListener';

class WindowController {
  static setOnLoad(func) {
    window.onload = func;
  }

  static setOnScroll(func) {
    window.onscroll = func;
  }

  static setOn(str, func) {
    window[str] = func;
  }
}

window.addEventListener('message', MessageListener.onReactNativeMessage);

class DocumentController {
  static setOnLoad(func) {
    document.onload = func;
  }

  static setOnScroll(func) {
    document.onscroll = func;
  }

  static setOn(str, func) {
    document[str] = func;
  }
}
module.exports = { DocumentController, WindowController };
