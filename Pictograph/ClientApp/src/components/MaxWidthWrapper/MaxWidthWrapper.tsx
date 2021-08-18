import styled from "styled-components";
import { QUERIES } from "../../constants";

const MaxWidthWrapper = styled.div`
  max-width: calc(1200 / 16 * 1rem);
  padding: 0 32px;
  margin: 0 auto;

  @media ${QUERIES.mobileAndSmaller} {
    padding: 0 8px;
    max-width: revert;
  }
`;

export default MaxWidthWrapper;
