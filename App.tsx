/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  Button,
  ToastAndroid,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import {
  showFloatingBubble,
  hideFloatingBubble,
  requestPermission,
  initialize,
  checkPermission,
  isBubbleVisible,
} from 'react-native-floating-bubble-plugin';

const showToast = (text: string) => ToastAndroid.show(text, 1000);

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const onAdd = () =>
    showFloatingBubble()
      .then(() => showToast('Manually Added Bubble'))
      .catch(() => showToast('Failed to add'));
  const onHide = () =>
    hideFloatingBubble()
      .then(() => showToast('Manually Removed Bubble'))
      .catch(() => showToast('Failed to remove'));
  const onRequestPermission = () =>
    requestPermission()
      .then(() => showToast('Permission received'))
      .catch(() => showToast('Failed to get permission'));
  const onCheckPermissoin = () =>
    checkPermission()
      .then((value: boolean) =>
        showToast(`Permission: ${value ? 'Yes' : 'No'}`),
      )
      .catch(() => showToast('Failed to check'));
  const onInit = () =>
    initialize()
      .then(() => showToast('Init'))
      .catch(() => showToast('Failed init'));
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const isBubble = () =>
    isBubbleVisible()
      .then((isVisible: boolean) => {
        if (isVisible) {
          console.log('ddd', isVisible);
          showToast('Bubble is visible.');
        } else {
          console.log('ddd', isVisible);
          showToast('Bubble is invisible.');
        }
      })
      .catch(() => showToast('None'));

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text>Check Permission</Text>
          <Button title="Check" onPress={onCheckPermissoin} />
          <Text>Ger Permission</Text>
          <Button title="Get Permission" onPress={onRequestPermission} />
          <Text>Initialize Bubble Manage</Text>
          <Button title="Initialize" onPress={onInit} />
          <Text>Add the bubble</Text>
          <Button title="Add Bubble" onPress={onAdd} />
          <Text>Remove the bubble</Text>
          <Button title="Hide Bubble" onPress={onHide} />
          <Text>Check if the bubble is visible</Text>
          <Button title="Is Bubble Visible" onPress={isBubble} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
