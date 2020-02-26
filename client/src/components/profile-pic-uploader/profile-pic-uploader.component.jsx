import React from 'react';
import Client from '../../utils/HTTPClient';
import { Button } from '@material-ui/core';

const ProfilePicUploader = ({ socket, onCompleted }) => {
  const handleChange = e => {
    const input = e.target;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      const pic = { name: input.files[0].name, data: dataUrl };
      // TODO: send picture
      Client.request('/user/avatar', 'POST', pic).then(res => {
        const { pic, userId } = res;
        socket.emit('updateProfilePic', { userId, profilePic: pic });
        onCompleted();
      });
    };
    reader.readAsDataURL(input.files[0]);
  };

  return (
    <Button variant="contained" component="label">
      Upload Profile Picture
      <input
        type="file"
        accept="image/x-png,"
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </Button>
  );
};

export default ProfilePicUploader;
