import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { COLORS } from "../../themes/themes";
import AuthorsCards from "../../components/cards/AuthorsCards";
import { dummAuthors } from "../../data/dummyData";
import FormButton from "../../components/form/FormButton";

export const FooterContainer = styled.div`
  background: ${COLORS.legacyBridgeSecondBlue};
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
  margin-bottom: 10px;
  font-size: 30px;
  color: black;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    margin-top: 20px;
  }
`;

export const FooterDescription = styled.p`
  margin-bottom: 20px;
  font-size: 18px;
  color: black;
  font-style: italic;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    margin-top: 15px;
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

function Books({ reduxBooksOnlyData }) {
  const navigate = useNavigate();

  const naviagetToBookstorePage = () => {
    // Implement navigation logic to bookstore page
    console.log("Navigating to Bookstore Page...");
    navigate("/bookstore");
  };

  return (
    <FooterContainer>
      <FooterHeader>Published Books</FooterHeader>
      <FooterDescription>
        Your Next Reading Adventure Starts Here
      </FooterDescription>

      {/* Authors List */}
      <AuthorsGrid>
        {reduxBooksOnlyData?.map((author, index) => (
          <AuthorsCards key={index} props={author} />
        ))}
      </AuthorsGrid>

      {/* Author action buttons */}
      <AuthorActionButtons>
        <FormButton
          title="View Bookstore"
          width={"100%"}
          onClick={naviagetToBookstorePage}
        />
      </AuthorActionButtons>
    </FooterContainer>
  );
}

export default Books;
