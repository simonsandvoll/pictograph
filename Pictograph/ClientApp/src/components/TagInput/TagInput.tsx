import React, { useState } from "react";
import styled from "styled-components";
import Paragraph from "../Text/Paragraph";

export default function TagInput({
  defineTags,
}: {
  defineTags: (arr: string[]) => void;
}) {
  const [currentTagText, setCurrentTagText] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCurrentTagText(e.target.value);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const trimmedInput = currentTagText.trim();

    if (key === "," && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setCurrentTagText("");
    }

    if (
      key === "Enter" &&
      trimmedInput.length &&
      !tags.includes(trimmedInput)
    ) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setCurrentTagText("");
    }

    if (
      key === "Backspace" &&
      !currentTagText.length &&
      tags.length &&
      isKeyReleased
    ) {
      e.preventDefault();
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      setTags(tagsCopy);
      setCurrentTagText(poppedTag ?? "");
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => setIsKeyReleased(true);

  const deleteTag = (index: number) =>
    setTags((prevState) => prevState.filter((tag, i) => i !== index));

  return (
    <Wrapper>
      <Paragraph>Enter tags for your image here:</Paragraph>
      <InputContainer>
        {tags.map((tag, index) => (
          <Tag key={tag}>
            {tag}
            <button type="button" onClick={() => deleteTag(index)}>
              x
            </button>
          </Tag>
        ))}
        <Input
          name="tag"
          type="text"
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onChange={onChange}
          onBlur={() => defineTags(tags)}
          placeholder="Write tags here (seperate with , )"
          value={currentTagText}
        />
      </InputContainer>
    </Wrapper>
  );
}

const Wrapper = styled.label``;

const InputContainer = styled.div`
  padding: 6px 8px;
  border-radius: 8px;
  border: 2px solid var(--color-gray-900);
  background-color: var(--color-white);
  display: flex;
  overflow: auto;
`;

const Input = styled.input`
  width: 100%;
  min-width: 50%;
  border: none;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-primary);
  white-space: nowrap;
  color: var(--color-white);
  border-radius: 8px;
  padding: 0 8px;
  margin-right: 8px;
  & button {
    display: flex;
    padding: 6px;
    border: none;
    background-color: unset;
    cursor: pointer;
    color: inherit;
  }
`;
