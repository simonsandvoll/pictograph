import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { QUERIES } from "../constants";
import MaxWidthWrapper from "./MaxWidthWrapper";

export default function NavMenu() {
  return (
    <Wrapper>
      <NavWrapper>
        <Logo to="/">Pictograph</Logo>
        <SubNav>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/upload-file">Upload file</NavLink>
          </li>
        </SubNav>
      </NavWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  margin-bottom: 46px;
  position: sticky;
  height: ${72 / 16}rem;
  background-color: var(--color-gray-100);
  top: 0;
  z-index: 2;
  border-bottom: 2px solid var(--color-gray-300);

  @media ${QUERIES.tabletAndSmaller} {
    margin-bottom: 16px;
  }

  @media ${QUERIES.mobileAndSmaller} {
    height: 102px;
  }
`;

const NavWrapper = styled(MaxWidthWrapper)`
  --gap: 24px;
  display: flex;
  align-items: baseline;
  padding: 18px 32px;
  justify-content: space-between;
  gap: var(--gap);

  @media ${QUERIES.mobileAndSmaller} {
    flex-direction: column;
  }
`;

const SubNav = styled.ul`
  display: flex;
  gap: var(--gap);

  @media ${QUERIES.mobileAndSmaller} {
    align-self: flex-end;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: var(--color-gray-900);
  font-size: ${18 / 16}rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Logo = styled(NavLink)`
  font-size: ${24 / 16}rem;
`;
