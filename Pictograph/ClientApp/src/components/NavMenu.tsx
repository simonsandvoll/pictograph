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

  @media ${QUERIES.tabletAndSmaller} {
    margin-bottom: 16px;
  }
`;

const NavWrapper = styled(MaxWidthWrapper)`
  --gap: 16px;
  display: flex;
  align-items: baseline;
  padding: 18px 32px;
  justify-content: space-between;
  gap: var(--gap);
  flex-wrap: wrap;
`;

const SubNav = styled.ul`
  display: flex;
  gap: var(--gap);
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
