import React, { ReactElement, useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Button,
  TextInput,
} from 'react-native';
import WebView from 'react-native-webview';
import URLs from './constants/URLs';
import parseUrl from './helpers/parseUrl';
import WebViewController from './WebViewComponents/WebViewController';
import Message from './WebViewComponents/Message';
import MessageListener from './WebViewComponents/MessageListener';
import Types from './constants/Types';

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, backgroundColor: '#99efff' },
});

const HomeScreen = (): ReactElement => {
  const [type, setType] = useState('NOOP');
  const [data, setData] = useState({ test: 'test' });
  useEffect(() => {
    const removeONLoad = MessageListener.on(Types.ON_LOAD, (): void => {
      console.log('CALISIYOR');
    });
    return () => {
      removeONLoad();
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <WebView
        ref={WebViewController.setWebViewRef}
        style={{
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height,
        }}
        source={{
          uri: parseUrl(URLs.htmlUrl),
          baseUrl: '',
        }}
        allowFileAccess
        allowFileAccessFromFileURLs
        onMessage={MessageListener.onMessage}
        allowUniversalAccessFromFileURLs
        originWhitelist={['*']}
        onLoad={WebViewController.setUpWebView(false)}
      />
      <TextInput onChangeText={(val) => setType(val)} value="NOOP" />
      <TextInput onChangeText={(val) => setData(val)} />
      <Button
        title="sendMessage"
        onPress={() => {
          new Message({ type, data }).send();
        }}
      />
      <Button
        title="reload"
        onPress={() => {
          WebViewController.webViewRef.reload();
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
