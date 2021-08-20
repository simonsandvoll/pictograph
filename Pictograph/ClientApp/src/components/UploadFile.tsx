import React, { useState } from "react";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";
import Paragraph from "./Text/Paragraph";
import Title from "./Text/Title";
import { snippWord } from "./Tools/WordSnipp";
import UnstyledButton from "./UnstyledButton";

export default function UploadFile() {
  const [file, setFile] = useState<Blob>();
  const [fileName, setFileName] = useState<string>("");
  const [isUploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const saveFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (!e.target.files[0].type.startsWith("image/")) {
        setErrorMessage(
          "The selcted file has wrong format, needs to be an image type"
        );
      } else {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        setErrorMessage("");
      }
    } else {
      setErrorMessage("You need to select a valid file");
    }
  };

  const submit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("formFile", file);
      formData.append("fileName", fileName);
      setUploading(true);
      try {
        await fetch("storage", { method: "post", body: formData });
        setErrorMessage("");
      } catch (ex) {
        setErrorMessage("Could not upload file, try again");
      }
      setUploading(false);
    }
  };

  return (
    <>
      <Title>Upload file here</Title>
      <Wrapper>
        <Upload htmlFor="fileupload">
          <Paragraph>
            {fileName.length > 0
              ? `File chosen: ${snippWord(fileName)}`
              : "Browse files..."}
          </Paragraph>
          <input
            id="fileupload"
            type="file"
            onChange={saveFile}
            accept="image/*"
          />
        </Upload>

        <Error>{errorMessage}</Error>
        <SubmitButton
          type="button"
          value="upload"
          onClick={submit}
          disabled={errorMessage.length > 0 || isUploading}
        >
          {isUploading ? <LoadingSpinner /> : "Upload"}
        </SubmitButton>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.form`
  display: flex;
  gap: 8px;
`;

const Error = styled(Paragraph)`
  color: hsl(0, 60%, 50%);
`;

const Upload = styled.label`
  background-color: var(--color-secondary);
  padding: 6px 8px;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: ${18 / 16}rem;
  display: flex;
  justify-content: center;
  color: var(--color-white);
  cursor: pointer;

  &:hover {
    background-color: var(--color-white);
    border-color: var(--color-secondary);
    color: var(--color-gray-900);
  }
  & input[type="file"] {
    display: none;
  }
`;

const SubmitButton = styled(UnstyledButton)`
  background-color: var(--color-primary);
  padding: 6px 8px;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: ${18 / 16}rem;
  display: flex;
  justify-content: center;
  color: var(--color-white);

  & svg {
    height: ${18 / 16}rem;
    stroke: var(--color-white);
  }

  &:hover {
    background-color: var(--color-white);
    border-color: var(--color-primary);
    color: var(--color-gray-900);
  }
`;
