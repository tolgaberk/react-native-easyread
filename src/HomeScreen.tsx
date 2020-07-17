import React, { ReactElement, useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Button,
  TextInput,
  Pressable,
  Text,
  View,
} from 'react-native';
import WebView from 'react-native-webview';
import Modal, { ModalProps } from 'react-native-modal';
import URLs from './constants/URLs';
import parseUrl from './helpers/parseUrl';
import WebViewController from './WebViewComponents/WebViewController';
import Message from './WebViewComponents/Message';
import MessageListener from './WebViewComponents/MessageListener';
import Types from './constants/Types';
import Dummy from './Dummy.json';

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, backgroundColor: '#99efff' },
  modalView: { width: '80%', backgroundColor: 'white', marginVertical: 200 },
  modalContainer: { alignItems: 'center', justifyContent: 'center' },
});

interface modalProps {
  isVisible: boolean;
  onBackdropPress: VoidFunction;
  onBackButtonPress: VoidFunction;
  hideModalContentWhileAnimating: boolean;
}

const HomeScreen = (): ReactElement => {
  const [message, setMessage] = useState(new Message());
  const [modalVisible, setModalVisible] = useState(false);
  useOnLoad();
  listenOnSelectionChange();
  const modalToggler = () =>
    setModalVisible((prevState: boolean): boolean => !prevState);

  const modalPropsPreset: modalProps = {
    isVisible: modalVisible,
    onBackdropPress: modalToggler,
    onBackButtonPress: modalToggler,
    hideModalContentWhileAnimating: true,
  };

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
        allowsLinkPreview
        onMessage={MessageListener.onMessage}
        allowUniversalAccessFromFileURLs
        originWhitelist={['*']}
        onLoad={WebViewController.setUpWebView(true)}
      />
      <Pressable onPress={() => setModalVisible((prevState) => !prevState)}>
        <Text>Ich Bin Ein Button</Text>
      </Pressable>
      <Modal {...modalPropsPreset} style={styles.modalContainer}>
        <View style={styles.modalView}>
          <TextInput
            style={{ backgroundColor: 'gray' }}
            placeholder="type"
            onChangeText={(type) =>
              setMessage(
                (msg: Message): Message => {
                  const newMessage = { type, data: msg.data };
                  return new Message(newMessage);
                },
              )
            }
          />
          <TextInput
            style={{ backgroundColor: 'gray' }}
            placeholder="data"
            onChangeText={(data) =>
              setMessage(
                (msg: Message): Message => {
                  const newMessage = { type: msg.type, data };
                  return new Message(newMessage);
                },
              )
            }
          />
          <Button title="sendMessage" onPress={message.send} />
          <Button
            title="reload"
            onPress={() => {
              WebViewController.webViewRef.reload();
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

function useOnLoad() {
  useEffect(() => {
    const removeOnLoad = MessageListener.on(Types.ON_LOAD, (): void => {
      const paragraphData = Dummy.slice(0, 30);

      const onLoadMessage = new Message({
        type: Types.ON_LOAD,
        data: paragraphData,
      });
      onLoadMessage.send();
    });
    return () => {
      removeOnLoad();
    };
  }, []);
}
function listenOnSelectionChange() {
  useEffect(() => {
    const removeOnSelect = MessageListener.on(
      Types.ON_SELECTION_CHANGE,
      (data) => console.log(data),
    );
    return () => {
      removeOnSelect();
    };
  }, []);
}
