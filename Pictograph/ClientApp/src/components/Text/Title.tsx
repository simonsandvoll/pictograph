import styled from "styled-components";
import { QUERIES, WEIGHTS } from "../../constants";

const Title = styled.h1`
  font-size: ${46 / 16}rem;
  font-weight: ${WEIGHTS.bold};

  @media ${QUERIES.tabletAndSmaller} {
    font-size: ${24 / 16}rem;
  }

  @media ${QUERIES.mobileAndSmaller} {
    font-size: ${20 / 16}rem;
  }
`;

export default Title;
