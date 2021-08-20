import React from "react";
import styled from "styled-components";
import Paragraph from "../Text/Paragraph";

export default function Footer() {
  return (
    <Wrapper>
      <FooterText>© 2021-present Simon Sandvoll</FooterText>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  text-align: center;
  padding: 32px;
`;

const FooterText = styled(Paragraph)`
  color: var(--color-gray-500);
`;
