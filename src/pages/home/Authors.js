import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { COLORS } from "../../themes/themes";
import AuthorsCards from "../../components/cards/AuthorsCards";
import FormButton from "../../components/form/FormButton";
import TransparentBtn from "../../components/form/TransparentBtn";

export const FooterContainer = styled.div`
  background: ${COLORS.white};
  padding: 60px;
  color: #fff;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    padding: 5px;
  }
`;

export const FooterHeader = styled.h2`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 30px;
  color: black;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    margin-top: 20px;
  }
`;

export const AuthorsGrid = styled.div`
  flex-wrap: wrap;
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;

  flex-direction: row;
  align-content: center;
  align-items: center;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    padding: 5px;
  }
`;

export const AuthorActionButtons = styled.div`
  margin-top: 50px;
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 5px;
    margin-bottom: 30px;
  }
`;

function Authors({ reduxBooksOnlyData }) {
  const navigate = useNavigate();

  const naviagetToAuthorsPage = () => {
    // Implement navigation logic to authors page
    console.log("Navigating to Authors Page...");
    navigate("/authors");
  };

  const naviagetToBecomeAnAuthorPage = () => {
    navigate("/become-an-author");
  };

  const groupedByAuthor = Object.values(
    reduxBooksOnlyData?.reduce((acc, book) => {
      const authorId = book?.author?.toLowerCase()?.replace(/\s/g, "-");

      if (!acc[authorId]) {
        acc[authorId] = {
          author: book?.author,
          authorImage: book?.authorImage,
          aboutAuthor: book?.aboutAuthor,
          authorProfile: book?.authorProfile,
          books: [],
        };
      }

      acc[authorId]?.books?.push(book);

      // console.log('accc', acc);

      return acc;
    }, {}) || {},
  );

  return (
    <FooterContainer>
      <FooterHeader>Meet Our Authors</FooterHeader>

      {/* Authors List */}
      <AuthorsGrid>
        {groupedByAuthor?.map((author, index) => (
          <AuthorsCards key={index} props={author} />
        ))}
      </AuthorsGrid>

      {/* Author action buttons */}
      <AuthorActionButtons>
        <FormButton
          title="View All Authors"
          width={"100%"}
          onClick={naviagetToAuthorsPage}
        />
        <TransparentBtn
          title="Become an Author"
          width={"100%"}
          onClick={naviagetToBecomeAnAuthorPage}
        />
      </AuthorActionButtons>
    </FooterContainer>
  );
}

export default Authors;
