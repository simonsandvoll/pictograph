import React from "react";
import styled from "styled-components";
import Paragraph from "../Text/Paragraph";

interface Props {
  type: string;
  label: string;
  name: string;
  placeholder: string;
  value: any;
  changeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  type,
  label,
  name,
  placeholder,
  value,
  changeEvent,
}: Props) {
  return (
    <InputWrapper htmlFor={name}>
      <Paragraph>{label}</Paragraph>
      <Field
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={changeEvent}
      />
    </InputWrapper>
  );
}

const InputWrapper = styled.label`
  display: flex;
  flex-direction: column;
  font-size: ${18 / 16}rem;
`;

const Field = styled.input`
  padding: 6px 8px;
  border: 2px solid var(--color-gray-900);
  border-radius: 8px;
`;
