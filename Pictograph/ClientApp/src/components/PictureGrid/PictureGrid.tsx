import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { ApiClient } from "../../ApiClient";
import PictureModal from "../PictureModal";
import UnstyledButton from "../UnstyledButton";
import { ChunkArray } from "../Tools/ArrayUtils";
import useWindowSize from "../Hooks/useWindowSize";

type Sizes = "s" | "m" | "l";

export interface Picture {
  id: string;
  name: string;
  url: string;
  title: string;
  description: string;
  tags: string[];
  createdOn?: string;
}

interface Props {
  size?: Sizes;
}

const getPictures = async () => {
  const apiClient = new ApiClient("/storage");
  return apiClient.get();
};

export default function PictureGrid({ size = "m" }: Props) {
  const [pictures, setPictures] = useState<Picture[][]>([]);
  const [isLoading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState<Picture>();
  const [numColumns, setNumColumns] = useState(3);
  const [width] = useWindowSize();

  function getStylesForSizes(): Record<string, string> {
    switch (size) {
      case "s":
        return {
          "--size": "150px",
          "--spacing": "30px",
        };
      case "m":
      default:
        return {
          "--size": "300px",
          "--spacing": "30px",
        };
      case "l":
        return {
          "--size": "600px",
          "--spacing": "30px",
        };
    }
  }

  const defineColumns = (screenWidth: number) => {
    let columns = 3;
    if (screenWidth < 710) {
      columns = 1;
    } else if (screenWidth < 1024 && screenWidth >= 710) {
      columns = 2;
    } else {
      columns = 3;
    }
    return columns;
  };

  useEffect(() => {
    const columns = defineColumns(width);
    const fetchData = async () => {
      setLoading(true);
      setNumColumns(columns);
      const result = await getPictures();
      const pictureArray: Picture[][] = ChunkArray<Picture>(result, columns);
      await setPictures(pictureArray);
      await setTimeout(() => setLoading(false), 700);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const columns = defineColumns(width);
    if (columns !== numColumns) {
      setNumColumns(columns);
    }
  }, [width]);

  useEffect(() => {
    const resetColumns = async () => {
      if (!isLoading) {
        let pictureArray: Picture[][] = ChunkArray<Picture>(
          pictures.flat(),
          numColumns
        );
        setPictures(pictureArray);
      }
    };
    resetColumns();
  }, [numColumns]);

  const dismiss = () => {
    setShowModal(false);
    setSelectedPicture(undefined);
  };

  const open = (picture: Picture) => {
    setSelectedPicture(picture);
    setShowModal(true);
  };

  return (
    <>
      <Grid style={{ ...getStylesForSizes() }}>
        {!isLoading ? (
          pictures.map((arr, i) => (
            <Column key={arr[0].name + i}>
              {arr.map((picture) => (
                <PictureWrapper key={picture.id}>
                  <ImgButton onClick={() => open(picture)}>
                    <img
                      sizes="(min-width: 1335px) 416px, (min-width: 992px) calc(calc(100vw - 72px) / 3), (min-width: 768px) calc(calc(100vw - 48px) / 2), 100vw"
                      title={picture.name}
                      alt={picture.description}
                      src={picture.url}
                    />
                  </ImgButton>
                </PictureWrapper>
              ))}
            </Column>
          ))
        ) : (
          <>
            <Column>
              <Skeleton height={300} wrapper={PictureWrapper} />
              <Skeleton height={300} wrapper={PictureWrapper} />
              <Skeleton height={300} wrapper={PictureWrapper} />
            </Column>
            <Column>
              <Skeleton height={300} wrapper={PictureWrapper} />
              <Skeleton height={300} wrapper={PictureWrapper} />
              <Skeleton height={300} wrapper={PictureWrapper} />
            </Column>
            <Column>
              <Skeleton height={300} wrapper={PictureWrapper} />
              <Skeleton height={300} wrapper={PictureWrapper} />
              <Skeleton height={300} wrapper={PictureWrapper} />
            </Column>
          </>
        )}
      </Grid>
      {!isLoading && (
        <PictureModal
          isOpen={showModal}
          onDismiss={() => dismiss()}
          picture={selectedPicture ?? pictures[0][0]}
        />
      )}
    </>
  );
}

const Grid = styled.ul`
  margin-top: var(--spacing);
  display: grid;
  list-style: none;
  --column-size: min(var(--size), 100%);
  grid-template-columns: repeat(auto-fit, minmax(var(--column-size), 1fr));
  gap: var(--spacing);
  align-items: start;
  padding-bottom: var(--spacing);
`;

const Column = styled.li`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--spacing);
`;

const ImgButton = styled(UnstyledButton)`
  border-radius: 8px;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &:focus {
    outline: 2px solid initial;
    outline-offset: 4px;
  }
`;

const PictureWrapper = styled.div`
  height: 100%;

  &:hover img {
    transform: scale(1.1);
  }

  & img {
    transition: transform 250ms;
    will-change: transform;

    height: 100%;
    width: 100%;
  }
`;
