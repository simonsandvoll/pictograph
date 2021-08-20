import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import MaxWidthWrapper from "./MaxWidthWrapper";
import NavMenu from "./NavMenu";

export default function Layout({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <>
      <NavMenu />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </>
  );
}

const Wrapper = styled(MaxWidthWrapper)`
  min-height: 80vh;
`;
