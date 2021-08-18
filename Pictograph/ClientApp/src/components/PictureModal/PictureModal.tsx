import React from "react";
import styled from "styled-components";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { Picture } from "../Home";
import Title from "../Text/Title";
import UnstyledButton from "../UnstyledButton";
import { QUERIES } from "../../constants";
import LinkAsButton from "../LinkAsButton";
import { snippWord } from "../Tools/WordSnipp";

interface Props {
  isOpen: boolean;
  onDismiss: () => void;
  picture: Picture;
}

export default function PictureModal({ isOpen, onDismiss, picture }: Props) {
  return picture ? (
    <Overlay isOpen={isOpen} onDismiss={onDismiss}>
      <Content aria-label="Picture modal">
        <CloseButton onClick={onDismiss}>Close</CloseButton>
        <PictureTitle>{snippWord(picture.name.split(".")[0])}</PictureTitle>
        <DownloadLink href={picture.url} download>
          Download
        </DownloadLink>
        <PictureWrapper>
          <img src={picture.url} alt={picture.name} />
        </PictureWrapper>
      </Content>
    </Overlay>
  ) : (
    <></>
  );
}

const Overlay = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 80px;
  background-color: var(--color-backdrop);
  cursor: zoom-out;

  @media ${QUERIES.mobileAndSmaller} {
    padding: 80px 16px;
  }
`;

const Content = styled(DialogContent)`
  position: relative;
  cursor: initial;
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-template-areas:
    "title download"
    "picture picture";
  align-items: center;
  background-color: var(--color-white);
  padding: 16px;
  min-width: 100%;
  border-radius: 8px;

  @media ${QUERIES.tabletAndSmaller} {
    grid-template-columns: 1fr;
    grid-template-areas:
      "title"
      "picture"
      "download";
  }
`;

const PictureTitle = styled(Title)`
  grid-area: title;
`;

const DownloadLink = styled(LinkAsButton)`
  grid-area: download;
`;

const PictureWrapper = styled.figure`
  overflow: hidden;
  grid-area: picture;

  & img {
    width: 100%;
  }
`;

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  right: 0;
  top: 0;
  transform: translateY(-100%);
  padding: 16px;
  color: white;
  font-size: ${18 / 16}rem;
`;
