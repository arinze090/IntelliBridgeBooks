import React from "react";
import styled from "styled-components";

import { COLORS } from "../../themes/themes";

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
  font-size: 16px;
  color: black;
  line-height: 2;
  max-width: 90%;

  @media (max-width: 768px) {
    align-items: center;
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

function Guidelines() {
  return (
    <FooterContainer>
      <FooterHeader>Guidelines for Submission</FooterHeader>
      <FooterDescription>
        - Please note that only ONE submission per writer is allowed. Multiple
        submissions may lead to disqualification.
        <br />- While we encourage submissions from all genres of fiction and
        non-fiction, we are particularly on the lookout for CRIME and HORROR
        writing.
        <br />- You will be required to attach a one-page synopsis of the work
        you are submitting in Microsoft Word. Please include all major plot
        points in your synopsis, including spoilers, and especially the end.
        <br />- You will be required to attach a sample of the work in question.
        This should be the first 3 chapters or first 3 stories of your
        manuscript in Microsoft Word. <br />
        -Send your manuscript sample in double-spaced, indented paragraph,
        justified only. We prefer Courier New font type with a font size of
        12pt.
        <br />- Your submission will be acknowledged and assessed by our
        editors. We will respond within twelve weeks IF AND ONLY IF we are
        provisionally interested in publishing your work, after which we would
        ask for more of your material. If after reading the rest of the work and
        we find it to our taste and cut, we would then present you with an
        offer.
        <br />- Due to the volume of submissions we receive, we may not be able
        to respond to you immediately.
        <br />- IntelliBridge is not accepting unsolicited poetry submissions or
        plays at this time. Unsolicited submissions sent to other Masobe email
        addresses may be overlooked. Hard copy submissions will not be
        acknowledged or returned. You can also bless the world with your work
        through self-publishing.
        <br />- To publish under our self-publishing imprint, please send a mail
        to info@legacybridgepublishing.com. The mail should state your intent.
        Include the first three chapters of your work and your bio. We will
        respond promptly.
        <br />- Please see the FAQs or email info@legacybridgepublishing.com for
        further information on how to publish with us.
      </FooterDescription>
    </FooterContainer>
  );
}

export default Guidelines;
