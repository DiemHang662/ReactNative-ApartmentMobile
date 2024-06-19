import React, { useState } from 'react';
import { View, Button, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { authApi } from '../../configs/API'; 

const ChangeAvatar = () => {
  const [avatar, setAvatar] = useState(null);

  const handleChooseAvatar = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied!', 'Permission to access the media library is required.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0]);
    }
  };

  const handleUploadAvatar = async () => {
    if (!avatar) {
      Alert.alert('Error', 'No avatar selected');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('avatar', {
        uri: avatar.uri,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      });

      const api = await authApi();

      const res = await api.patch('/api/residents/change-avatar/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Avatar updated successfully:', res.data);
      Alert.alert('Success', 'Avatar updated successfully');

    } catch (error) {
      console.error('Error updating avatar', error);
      Alert.alert('Error', 'Failed to update avatar');
    }
  };

  return (
    <View style={styles.container}>
       {avatar && <Image source={{ uri: avatar.uri }} style={styles.avatarImage} />}
      <View style={styles.buttonContainer}>
        <Button title="Chọn ảnh" onPress={handleChooseAvatar} color={'green'} />
        <Button  title="Đổi ảnh đại diện" onPress={handleUploadAvatar} color={'green'}  />
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%',
  },

  avatarImage: {
    width: 400,
    height: 500,
    marginBottom: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '85%',
    marginBottom: 20,
    marginTop:20,
  },

});

export default ChangeAvatar;
