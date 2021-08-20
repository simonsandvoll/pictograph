import React from "react";
import styled from "styled-components";
import PictureGrid from "./PictureGrid";
import Title from "./Text/Title";

export default function Home() {
  return (
    <div>
      <PageTitle>Welcome to Pictograph</PageTitle>
      <PictureGrid size="m" />
    </div>
  );
}

const PageTitle = styled(Title)``;
