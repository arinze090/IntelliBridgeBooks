import React from "react";
import styled from "styled-components";

export const AuthorCard = styled.div`
  width: 200px;
  height: 250px;
  display: flex;

  @media (max-width: 768px) {
    width: 170px;
    height: 200px;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 250px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 170px;
    height: 200px;
  }
`;

export const AuthorImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${ImageWrapper}:hover & {
    transform: scale(1.1);
  }
`;

export const AuthorOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end; /* push content to bottom */
  justify-content: center;

  padding: 10px;
  color: #fff;
  font-weight: 600;
  font-size: 16px;

  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));

  pointer-events: none;
`;

export const AuthorName = styled.div`
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
  bottom: 10px;
`;

function AuthorsCards({ props }) {
  console.log("pppp", props);
  return (
    <AuthorCard>
      <ImageWrapper>
        <AuthorImage src={props?.authorImage} alt="Author" />
        <AuthorOverlay>{props?.author}</AuthorOverlay>
      </ImageWrapper>
    </AuthorCard>
  );
}

export default AuthorsCards;
