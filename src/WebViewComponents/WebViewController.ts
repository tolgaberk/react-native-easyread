import WebView from 'react-native-webview';
import { WebViewNavigationEvent } from 'react-native-webview/lib/WebViewTypes';

export default class WebViewController {
  static webViewRef: WebView;

  static setWebViewRef(ref: WebView): void {
    WebViewController.webViewRef = ref;
  }

  static reloadWebView(): void {
    WebViewController.webViewRef.reload();
  }

  static setUpWebView(sendConfirmation: boolean): CallableFunction {
    return (_: WebViewNavigationEvent): void => {
      WebViewController.webViewRef.injectJavaScript(`(function(){
      window.sendConfirmation = ${sendConfirmation}
    })(); true;`);
    };
  }
}
