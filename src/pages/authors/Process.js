import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { GoPaperclip } from "react-icons/go";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsSend } from "react-icons/bs";

import { COLORS } from "../../themes/themes";
import FormInput from "../../components/form/FormInput";
import ManuscriptCard from "../../components/cards/ManuscriptCard";

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

export const FooterDescription = styled.p`
  margin-bottom: 20px;
  font-size: 15px;
  color: black;
  max-width: 80%;

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

export const manuscripts = [
  {
    id: 1,
    icon: <GoPaperclip size={30} color={COLORS.legacyBridgeSecondBlue} />,
    title: "Submit Manuscript",
    description:
      "Kickstart your journey to becoming a Intellibridge Author by submitting your manuscript to our email address.",
  },
  {
    id: 2,
    icon: (
      <AiOutlineFileSearch size={30} color={COLORS.legacyBridgeSecondBlue} />
    ),
    title: "Review",
    description:
      "Upon receipt, our editorial team will meticulously review your submission. This process takes up to eight weeks, and you’ll hear from us if your manuscript sparks an interest.",
  },
  {
    id: 3,
    icon: <BsSend size={30} color={COLORS.legacyBridgeSecondBlue} />,
    title: "Publish",
    description:
      "If your manuscript meets our criteria and stands out to our editors, we will extend an offer to publish your work under the IntelliBridge imprint.",
  },
];

function Processes() {
  return (
    <FooterContainer>
      <FooterHeader>Our 3-Step Process</FooterHeader>
      <FooterDescription>
        From the moment you submit your manuscript to the exhilarating day of
        publication, we’re here to guide you every step of the way. Embrace the
        opportunity to share your unique voice and story, rooted in African
        themes with a universal appeal, and join our community of celebrated
        authors.
      </FooterDescription>

      <AuthorsGrid>
        {manuscripts?.map((cur, i) => (
          <ManuscriptCard key={i} props={cur} />
        ))}
      </AuthorsGrid>
    </FooterContainer>
  );
}

export default Processes;
