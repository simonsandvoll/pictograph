import styled from "styled-components";

export default styled.a`
  background-color: var(--color-primary);
  padding: 6px 8px;
  border: 2px solid transparent;
  border-radius: 8px;
  color: var(--color-white);
  text-decoration: none;

  &:hover {
    background-color: var(--color-white);
    border-color: var(--color-primary);
    color: var(--color-gray-900);
  }

  &:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`;
