import React, { useState } from "react";

interface ImageUploader {
  onNewImageDataUrl: (imageDataUrl: string) => void
}

const ImageUploader = (props: ImageUploader) => {
  const [dataURL, setDataURL] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile);
  };

  const handleFileUpload = () => {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const loadedDataUrl = reader.result as string;
      setDataURL(loadedDataUrl);
      props.onNewImageDataUrl(loadedDataUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      {dataURL && <img src={dataURL} alt="uploaded" />}
    </div>
  );
};

export default ImageUploader;
