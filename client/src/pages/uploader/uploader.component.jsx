import React, { createRef, useState } from 'react';
const Uploader = () => {
  const [file, setFile] = useState({});
  const handleChange = e => {
    const input = e.target;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setFile({ name: input.files[0].name, data: dataUrl });
    };
    reader.readAsDataURL(input.files[0]);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      <br />
      {file.name}
      <br />
      {file.data}
    </div>
  );
};

export default Uploader;
