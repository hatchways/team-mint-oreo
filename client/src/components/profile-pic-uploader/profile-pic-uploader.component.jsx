import React from 'react';
import Client from '../../utils/HTTPClient';
import { Button } from '@material-ui/core';
import ImageReader from '../image-reader/image-reader.component';

const ProfilePicUploader = ({ socket, onCompleted }) => {
  const onRead = pic => {
    Client.request('/user/avatar', 'POST', pic).then(res => {
      const { pic, userId } = res;
      socket.emit('updateProfilePic', { userId, profilePic: pic });
      onCompleted();
    });
  };
  return (
    <Button variant="contained" component="label">
      Upload Profile Picture
      <ImageReader style={{ display: 'none' }} onRead={onRead} />
    </Button>
  );
};

export default ProfilePicUploader;
