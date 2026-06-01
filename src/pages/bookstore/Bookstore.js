import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { COLORS } from "../../themes/themes";
import FormInput from "../../components/form/FormInput";
import verifyLoginToken from "../../components/hoc/veryLoginToken";
import axiosInstance from "../../utils/api-client";
import { getBooks } from "../../redux/features/books/booksSlice";
import AuthorsCards from "../../components/cards/AuthorsCards";

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

function Bookstore() {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const loggedInUser = state?.user?.user;
  const reduxBooks = state?.books?.books;
  console.log("reduxBooks", reduxBooks);
  console.log("loggedInUser", loggedInUser);

  const [loading, setLoading] = useState(false);

  const fetchBooksData = async () => {
    try {
      setLoading(true);

      const [intelliRes, libraryRes] = await Promise.all([
        axiosInstance("/api/books"),
        axiosInstance("/api/orders/my-library"),
      ]);

      const intelliBooks = intelliRes?.data || [];
      const libraryBooks = libraryRes?.data || [];
      // console.log('intelliBooks', intelliBooks);
      // console.log('libraryBooks', libraryBooks);

      // ✅ Extract IDs properly
      const libraryIds = new Set(
        libraryBooks.map((item) => item?.book?._id)?.filter(Boolean),
      );

      console.log("libraryIds", [...libraryIds]);

      // 👉 Merge + Tag
      const mergedBooks = intelliBooks?.map((book) => ({
        ...book,
        isInLibrary: libraryIds?.has(book?._id),
      }));

      console.log("mergedBooks", mergedBooks);

      dispatch(getBooks(mergedBooks));

      setLoading(false);
    } catch (error) {
      console.error("fetchBooksData error:", error?.response);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooksData();
  }, []);

  return (
    <BookstoreContainer>
      <BookstoreHeader>Bookstore</BookstoreHeader>

      <SearchContainer>
        <FormInput
          inputPlaceholder="Search Books..."
          width={"100%"}
          inputBackgroundColor={"#fff"}
          inputColor={"#000"}
          marginBottom={"0px"}
        />
      </SearchContainer>

      {/* Authors List */}
      <AuthorsGrid>
        {reduxBooks?.length ? (
          reduxBooks?.map((author, index) => (
            <AuthorsCards key={index} props={author} />
          ))
        ) : (
          <p>dddjjd</p>
        )}
      </AuthorsGrid>
    </BookstoreContainer>
  );
}

export default verifyLoginToken(Bookstore);
