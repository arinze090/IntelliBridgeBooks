import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { COLORS } from "../../themes/themes";
import AuthorsCards from "../../components/cards/AuthorsCards";
import { dummAuthors } from "../../data/dummyData";
import FormButton from "../../components/form/FormButton";
import BookCardWithPriceTag from "../../components/cards/BookCardWithPriceTag";

export const FooterContainer = styled.div`
  background: ${COLORS.legacyBridgeSecondBlue};
  padding: 60px;
  color: #fff;
  justify-content: center;
  display: flex;
  //   align-items: center;
  flex-direction: column;
  margin: 0 auto;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    padding: 5px;
  }
`;

export const TitleSegmentRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
//   background-color: brown;
  align-items: center;
`;

export const IndicatorRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
//   background-color: green;
  align-items: center;
  align-content: center;
`;

export const TitleSegment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  //   margin-bottom: 20px;
`;

export const FooterHeader = styled.h2`
  font-weight: bold;
//   margin-bottom: 10px;
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

const BooksSliderWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-top: 30px;
`;

const BooksSlider = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scroll-behavior: smooth;
  //   padding: 10px 50px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ArrowButton = styled.button`
  //   position: absolute;
  top: 45%;
  //   transform: translateY(-50%);
  z-index: 10;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: ${COLORS.legacyBridgeSecondary};
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ left }) => left && `left: 0;`}
  ${({ right }) => right && `right: 0;`}

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }
`;

const Indicators = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

const Dot = styled.div`
  width: ${({ active }) => (active ? "30px" : "10px")};
  height: 10px;
  border-radius: 20px;
  transition: all 0.3s ease;
  background: ${({ active }) => (active ? COLORS.legacyBridgePrimary : "#ccc")};
`;

function Books2({ reduxBooksOnlyData }) {
  const navigate = useNavigate();

  const naviagetToBookstorePage = () => {
    // Implement navigation logic to bookstore page
    console.log("Navigating to Bookstore Page...");
    navigate("/bookstore");
  };

  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });

    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });

    setActiveIndex((prev) => Math.min(prev + 1, reduxBooksOnlyData.length - 1));
  };

  return (
    <FooterContainer>
      <TitleSegmentRow>
        <TitleSegment>
          <FooterHeader>Published Books</FooterHeader>
          <FooterDescription>
            Your Next Reading Adventure Starts Here
          </FooterDescription>
        </TitleSegment>

        {/* Indicator segment */}
        <IndicatorRow>
          <ArrowButton left onClick={scrollLeft}>
            <FaChevronLeft />
          </ArrowButton>

          <ArrowButton right onClick={scrollRight}>
            <FaChevronRight />
          </ArrowButton>
        </IndicatorRow>
      </TitleSegmentRow>

      {/* Authors List */}
      <BooksSliderWrapper>
        <BooksSlider ref={sliderRef}>
          {reduxBooksOnlyData?.map((book, index) => (
            <BookCardWithPriceTag key={index} props={book} />
          ))}
        </BooksSlider>
      </BooksSliderWrapper>

      <Indicators>
        {reduxBooksOnlyData?.slice(0, 5).map((_, index) => (
          <Dot key={index} active={index === activeIndex} />
        ))}
      </Indicators>

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

export default Books2;
