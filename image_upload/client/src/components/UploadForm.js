import React, { useState } from "react";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("이미지 파일을 업로드 해주세요.");

  return (
    <form>
      <label htmlFor="iamge">{fileName}</label>
      <input
        id="image"
        type="file"
        onChange={(event) => {
          const imageFile = event.target.files[0];
          setFile(imageFile);
          setFileName(imageFile.name);
        }}
      />
      <button type="submit">제출</button>
    </form>
  );
};

export default UploadForm;
