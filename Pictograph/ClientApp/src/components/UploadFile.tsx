import React, { useState } from "react";
import styled from "styled-components";
import Input from "./Input";
import LoadingSpinner from "./LoadingSpinner";
import TagInput from "./TagInput";
import Paragraph from "./Text/Paragraph";
import Title from "./Text/Title";
import { snippWord } from "./Tools/WordSnipp";
import UnstyledButton from "./UnstyledButton";

export default function UploadFile() {
  const [file, setFile] = useState<Blob>();
  const [fileName, setFileName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

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
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags.join(","));
      setUploading(true);
      try {
        await fetch("storage", { method: "post", body: formData });
        setFile(undefined);
        setFileName("");
        setTitle("");
        setDescription("");
        setErrorMessage("");
      } catch (ex) {
        setErrorMessage("Could not upload file, try again");
      }
      setUploading(false);
    }
  };
  const fileSelected = fileName.length > 0;
  return (
    <>
      <Title>Upload file here</Title>
      <Wrapper>
        <Input
          label="Image title: "
          name="title"
          type="string"
          value={title}
          placeholder="Type the image title here..."
          changeEvent={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <Input
          label="Image descripton: "
          name="description"
          value={description}
          type="string"
          placeholder="Type the image description here..."
          changeEvent={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
        />
        <TagInput defineTags={(arr: string[]) => setTags(arr)} />
        <Error>{errorMessage}</Error>
        <Upload htmlFor="fileupload">
          <UploadText>
            {fileSelected
              ? `File chosen: ${snippWord(fileName)}`
              : "Browse files..."}
          </UploadText>
          <input
            id="fileupload"
            type="file"
            onChange={saveFile}
            accept="image/*"
          />
        </Upload>
        <SubmitButton
          type="button"
          value="upload"
          onClick={submit}
          disabled={errorMessage.length > 0 || isUploading || !fileSelected}
        >
          {isUploading ? <LoadingSpinner /> : "Upload"}
        </SubmitButton>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.form`
  display: grid;
  --column-size: min(400px, 100%);
  grid-template-columns: repeat(auto-fit, minmax(var(--column-size), 1fr));
  gap: 16px;
  align-items: end;
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

const UploadText = styled(Paragraph)`
  color: inherit;
`;

const SubmitButton = styled(UnstyledButton)`
  background-color: ${(props) =>
    props.disabled ? "var(--color-gray-700)" : "var(--color-primary)"};
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

  ${(props) =>
    !props.disabled &&
    `
    &:hover {
      background-color: var(--color-white);
      border-color: var(--color-primary);
      color: var(--color-gray-900);
    }
  `}
`;
