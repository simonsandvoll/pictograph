import React, { useState, useEffect } from "react";
import { ApiClient } from "../ApiClient";
import styled from "styled-components";
import Title from "./Text/Title";
import PictureModal from "./PictureModal";
import UnstyledButton from "./UnstyledButton";

export interface Picture {
  name: string;
  url: string;
  createdOn?: string;
}

const getPictures = async () => {
  const apiClient = new ApiClient("/storage");
  return apiClient.get();
};

export default function Home() {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState<Picture>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getPictures();
      setLoading(false);
      setPictures(result);
    };

    fetchData();
  }, []);

  const dismiss = () => {
    setShowModal(false);
    setSelectedPicture(undefined);
  };

  const open = (picture: Picture) => {
    setSelectedPicture(picture);
    setShowModal(true);
  };

  return (
    <div>
      <PageTitle>Welcome to Pictograph</PageTitle>
      {!isLoading && (
        <PictureGrid>
          {pictures.map((picture: Picture) => (
            <PictureWrapper key={picture.name}>
              <ImgButton onClick={() => open(picture)}>
                <img alt={picture.name} src={picture.url} />
              </ImgButton>
            </PictureWrapper>
          ))}
        </PictureGrid>
      )}
      <PictureModal
        isOpen={showModal}
        onDismiss={() => dismiss()}
        picture={selectedPicture ?? pictures[0]}
      />
    </div>
  );
}

const PageTitle = styled(Title)``;

const PictureGrid = styled.ul`
  --size: 300px;
  display: grid;
  list-style: none;
  grid-template-columns: repeat(auto-fit, minmax(min(var(--size), 100%), 1fr));
  gap: 30px;
`;

const PictureWrapper = styled.li`
  height: var(--size);
  padding: 2px;

  &:hover img {
    transform: scale(1.2);
  }

  & img {
    transition: transform 250ms;
    will-change: transform;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    aspect-ratio: 2 / 1;
  }
`;

const ImgButton = styled(UnstyledButton)`
  height: 100%;
  width: 100%;
  border: 1px solid black;
  overflow: hidden;

  &:focus {
    outline: 2px solid black;
  }
`;
