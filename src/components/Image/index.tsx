import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  src?: string;
  iconLetter: string;
  iconSize: number;
}

const DefaultImgIcon = styled.span<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eff4f9;
  border-radius: 4px;
  font-weight: bold;
  width: ${({ iconSize }) => iconSize}px;
  height: ${({ iconSize }) => iconSize}px;
  font-size: ${({ iconSize }) => iconSize / 2}px;
  padding: ${({ iconSize }) => iconSize / 4}px;
  line-height: ${({ iconSize }) => (iconSize / 2 > 12 ? iconSize / 2 : 12)}px;
`;

const Image = ({ src, iconLetter, iconSize }: Props) => {
  const [loadError, setLoadError] = useState(false);
  if (loadError || !src) {
    return (
      <DefaultImgIcon iconLetter={iconLetter} iconSize={iconSize}>
        {iconLetter.substring(0, 1).toLocaleUpperCase()}
      </DefaultImgIcon>
    );
  }
  return (
    <img
      src={src}
      onError={() => {
        setLoadError(true);
      }}
    />
  );
};

export default Image;
