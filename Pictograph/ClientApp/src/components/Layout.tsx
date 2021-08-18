import React from "react";
import styled from "styled-components";
import MaxWidthWrapper from "./MaxWidthWrapper";
import NavMenu from "./NavMenu";

export default function Layout({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <div>
      <NavMenu />
      <Wrapper>{children}</Wrapper>
    </div>
  );
}

const Wrapper = styled(MaxWidthWrapper)``;
