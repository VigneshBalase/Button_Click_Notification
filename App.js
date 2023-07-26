import React from 'react';
import { View, Button } from 'react-native';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

const Screen = () => {
  async function onDisplayNotification() {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Required for iOS
    // See https://notifee.app/react-native/docs/ios/permissions
    await notifee.requestPermission();

    const notificationId = await notifee.displayNotification({
      title: 'Attendence Update',
      body: 'Student is present',
      android: {
        channelId,
      },
    });

    // Sometime later...
    await notifee.displayNotification({
      notificationId,
      title: 'Updated Notification Title',
      body: 'Nahi tho gaithunde podega sabko ',
      android: {
        channelId,
      },
    });
  }

  async function onDisplayRemoteNotification() {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Required for iOS
    // See https://notifee.app/react-native/docs/ios/permissions
    await notifee.requestPermission();

    // const notificationId1 = await notifee.displayNotification({
    //   title: 'Usko school jane bolna',
    //   body: 'Gaithunde sir hu mein',
    //   android: {
    //     channelId,
    //   },
    // });

    // Sometime later...
    await notifee.displayNotification({
      notificationId: notificationId1,
      title: 'Attendance Update',
      body: 'Student is absent',
      android: {
        channelId,
      },
    });
  }

  async function cancel(notificationId) {
    await notifee.cancelNotification(notificationId);
  }

  return (
    <View>
      <Button title="Display Notification" onPress={onDisplayNotification} />
      <Button title="Display Remote Notification" onPress={onDisplayRemoteNotification} />
      <Button title="Cancel Notification" onPress={() => cancel('123')} />
    </View>
  );
};

export default Screen;
