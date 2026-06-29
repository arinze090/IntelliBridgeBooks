import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { COLORS } from "../../themes/themes";
import BookCardWithPriceTag from "../../components/cards/BookCardWithPriceTag";

const AuthorDetailsContainer = styled.div`
  padding: 40px;
  padding-top: 20vh;

  color: #fff;
  justify-content: center;
  display: flex;
  //   align-items: center;
  flex-direction: column;
  margin: 0 auto;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    align-items: center;
    padding: 5px;
    padding-top: 20vh;
  }
`;

const AuthorDetailSection = styled.section`
  display: flex;
  gap: 70px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const AuthorBookSection = styled.section`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
`;

const AuthorImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AuthorImageWrapper = styled.div`
  //   width: 300px;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  border: 20px solid ${COLORS.legacyBridgeSecondary};
  //   padding: 20px;

  @media (max-width: 768px) {
    width: 200px;
    height: 250px;
    border: 10px solid ${COLORS.legacyBridgeSecondary};
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  //   gap: 20px;
  max-width: 70%;

  @media (max-width: 768px) {
    max-width: 100%;
    text-align: justify;
    gap: 10px;
    padding: 20px;
  }
`;

export const AuthorTitle = styled.h2`
  font-weight: bold;
  //   margin-bottom: 40px;
  font-size: 40px;
  color: black;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    margin-top: 20px;
    font-size: 30px;
  }
`;

export const AuthorBookTitle = styled.h4`
  font-weight: bold;
  //   margin-bottom: 40px;
  font-size: 30px;
  color: black;
  border-bottom: 1px solid #333;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    margin-top: 20px;
    font-size: 30px;
  }
`;

export const AuthorDescription = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  color: black;
  line-height: 1.6;
  //   max-width: 90%;

  @media (max-width: 768px) {
    align-items: center;
    margin-top: 20px;
    text-align: auto;
  }
`;

const AuthorBooksDisplaySection = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
`;

function AuthorDetailsPage() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const reduxSelectedAuthor = state?.books?.selectedAuthor;
  console.log("reduxSelectedAuthor", reduxSelectedAuthor);

  const isSmallScreen = window.innerWidth <= 768;

  return (
    <AuthorDetailsContainer>
      {/* Author Segment */}
      <AuthorDetailSection>
        <AuthorImageWrapper>
          <AuthorImage src={reduxSelectedAuthor?.authorImage} alt="Author" />
        </AuthorImageWrapper>

        <AuthorInfo>
          <AuthorTitle>{reduxSelectedAuthor?.author}</AuthorTitle>
          {!isSmallScreen && <AuthorDescription>Author</AuthorDescription>}
          <AuthorDescription>
            {reduxSelectedAuthor?.aboutAuthor}
          </AuthorDescription>
        </AuthorInfo>
      </AuthorDetailSection>

      {/* Authors Books Segment */}
      <AuthorBookSection>
        <AuthorBookTitle>{`Books by ${reduxSelectedAuthor?.author}`}</AuthorBookTitle>

        {/* authors books */}
        <AuthorBooksDisplaySection>
          {reduxSelectedAuthor?.books?.length > 0 ? (
            reduxSelectedAuthor?.books?.map((book) => (
              <BookCardWithPriceTag key={book?._id} props={book} />
            ))
          ) : (
            <p>No books available for this author.</p>
          )}
        </AuthorBooksDisplaySection>
      </AuthorBookSection>
    </AuthorDetailsContainer>
  );
}

export default AuthorDetailsPage;
