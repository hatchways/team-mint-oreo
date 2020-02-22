import React, { createRef, useState } from 'react';
import { sendPicture } from '../../utils/axios-utils';
const Uploader = () => {
  const [file, setFile] = useState({});
  const handleChange = e => {
    const input = e.target;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      const pic = { name: input.files[0].name, data: dataUrl };
      setFile(pic);
      sendPicture(pic);
    };
    reader.readAsDataURL(input.files[0]);
  };

  return (
    <div>
      <input type="file" accept="image/x-png," onChange={handleChange} />
      <br />
      {file.name}
      <br />
      {file.data}
    </div>
  );
};

export default Uploader;
