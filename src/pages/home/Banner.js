import React from "react";
import styled from "styled-components";

import BannerVideo from "../../assets/BannerVideo.mp4";
import FormButton from "../../components/form/FormButton";
import FormInput from "../../components/form/FormInput";

export const BannerContainer = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BannerBackground = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const BannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
`;

export const BannerContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 90%;
  text-align: center;
  padding: 20px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const BannerHeader = styled.h1`
  font-size: 40px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

export const BannerDescription = styled.p`
  color: #fff;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 60%;
  justify-content: center;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 16px;
    max-width: 100%;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  align-items: center;
  align-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SearchInput = styled.input`
  width: 700px;
  max-width: 100%;
  padding: 20px;
  border: none;
  border-radius: 10px;
  font-size: 18px;

  &:focus {
    outline: none;
  }
`;

export const SearchButton = styled.button`
  padding: 20px 35px;
  border: none;
  border-radius: 10px;
  background: #2ec4a6;
  color: white;
  font-size: 18px;
  cursor: pointer;
`;

function Banner() {
  return (
    <BannerContainer>
      <BannerBackground autoPlay loop muted playsInline>
        <source src={BannerVideo} type="video/mp4" />
      </BannerBackground>
      <BannerOverlay />

      <BannerContent>
        <BannerHeader>Welcome to IntelliBridge</BannerHeader>

        <BannerDescription>
          A curated intellectual capital infrastructure platform developed by
          Legacy Bridge Publishing to host, distribute, and monetize high-value
          leadership and performance-based knowledge.
        </BannerDescription>

        <SearchContainer>
          <FormInput
            inputPlaceholder="Search Books, Authors & More"
            width={"50%"}
            inputBackgroundColor={"#fff"}
            inputColor={"#000"}
            marginBottom={"0px"}
          />
          <FormButton title={"Search"} marginTop={"0px"} />
        </SearchContainer>
      </BannerContent>
    </BannerContainer>
  );
}

export default Banner;
