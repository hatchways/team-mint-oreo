import React from 'react';

/**
 * Reads the image off of the user's disk (use period)
 *
 * triggers onRead callback function upon imageRead
 * @param {Object}    style           Css Style of the input field.
 * @param {Function}  onRead(pic)     callbackFunction where pic is the picture object
 *
 * @return {JSX} returns jsx input
 */
const ImageReader = ({ onRead, style }) => {
  const handleChange = e => {
    const input = e.target;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      const pic = { name: input.files[0].name, data: dataUrl };
      onRead(pic);
    };
    reader.readAsDataURL(input.files[0]);
  };

  return <input type="file" accept="image/x-png," onChange={handleChange} style={style} />;
};

export default ImageReader;
