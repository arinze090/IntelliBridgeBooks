import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { COLORS } from "../../themes/themes";
import FormInput from "../../components/form/FormInput";
import verifyLoginToken from "../../components/hoc/veryLoginToken";

import AuthorsCards from "../../components/cards/AuthorsCards";
import NoDataFound from "../../components/common/NoDataFound";

const BookstoreContainer = styled.div`
  padding: 40px;
  padding-top: 20vh;

  color: #fff;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    align-items: center;
    padding: 5px;
    padding-top: 10vh;
  }
`;

export const BannerImage = styled.img`
  width: 100%;
  object-fit: cover;
  height: 60vh;
  margin-bottom: 40px;
  background: ${COLORS.legacyBridgeSecondary};
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
    object-fit: contain;
    height: 40vh;
    margin-bottom: 40px;
  }
`;

export const BookstoreHeader = styled.h2`
  font-weight: bold;
  margin-bottom: 40px;
  font-size: 40px;
  color: black;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    margin-top: 20px;
  }
`;

export const BookstoreDescription = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  color: black;
  line-height: 1.6;
  max-width: 90%;

  @media (max-width: 768px) {
    align-items: center;
    margin-top: 20px;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  align-items: center;
  align-content: center;
  width: 80%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const AuthorsGrid = styled.div`
  flex-wrap: wrap;
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 60px;

  flex-direction: row;
  align-content: center;
  align-items: center;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    padding: 5px;
  }
`;

function AuthorsPage() {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const reduxBooks = state?.books?.books;

  const groupedByAuthor = Object.values(
    reduxBooks?.reduce((acc, book) => {
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
  console.log("groupedByAuthor", groupedByAuthor);

  // Search filter states
  const [clicked, setClicked] = useState(false);
  const [search, setSearch] = useState("");
  const [masterDataSource, setMasterDataSource] = useState(groupedByAuthor);
  const [filteredDataSource, setFilteredDataSource] = useState(groupedByAuthor);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource?.filter((item) => {
        const itemData = item?.author ? item?.author?.toUpperCase() : "";

        const textData = text?.toUpperCase();

        return itemData?.indexOf(textData) > -1;
      });

      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  return (
    <BookstoreContainer>
      <BookstoreHeader>Meet Our Authors</BookstoreHeader>

      <SearchContainer>
        <FormInput
          inputPlaceholder="Search Authors..."
          width={"100%"}
          inputBackgroundColor={"#fff"}
          inputColor={"#000"}
          marginBottom={"0px"}
          value={search}
          onChange={(e) => searchFilterFunction(e.target.value)}
        />
      </SearchContainer>

      {/* Authors List */}
      <AuthorsGrid>
        {groupedByAuthor?.length ? (
          filteredDataSource?.map((author, index) => (
            <AuthorsCards key={index} props={author} />
          ))
        ) : (
          <NoDataFound noDataText={"No Author found at the moment"} />
        )}
      </AuthorsGrid>
    </BookstoreContainer>
  );
}

export default verifyLoginToken(AuthorsPage);
