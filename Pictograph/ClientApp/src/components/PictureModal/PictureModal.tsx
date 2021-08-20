import React from "react";
import styled from "styled-components";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import Title from "../Text/Title";
import UnstyledButton from "../UnstyledButton";
import { QUERIES } from "../../constants";
import LinkAsButton from "../LinkAsButton";
import { snippWord } from "../Tools/WordSnipp";
import { Picture } from "../PictureGrid/PictureGrid";
import Paragraph from "../Text/Paragraph";

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
        <TitleWrapper>
          <PictureTitle>{snippWord(picture.title)}</PictureTitle>
          <DownloadLink href={picture.url} download>
            Download
          </DownloadLink>
        </TitleWrapper>
        <Description>{picture.description}</Description>

        <PictureWrapper>
          <img
            sizes="(min-width: 1335px) 416px, (min-width: 992px) calc(calc(100vw - 72px) / 3), (min-width: 768px) calc(calc(100vw - 48px) / 2), 100vw"
            src={picture.url}
            alt={picture.description}
          />
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
  overflow: auto;

  @media ${QUERIES.mobileAndSmaller} {
    padding: 80px 16px;
  }
`;

const Content = styled(DialogContent)`
  position: relative;
  cursor: initial;
  background-color: var(--color-white);
  padding: 16px;
  border-radius: 8px;

  @media ${QUERIES.tabletAndSmaller} {
    grid-template-columns: 1fr;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const PictureTitle = styled(Title)``;

const DownloadLink = styled(LinkAsButton)``;

const Description = styled(Paragraph)`
  margin-bottom: 16px;
`;

const PictureWrapper = styled.figure`
  height: 80%;

  & img {
    height: 100%;
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
