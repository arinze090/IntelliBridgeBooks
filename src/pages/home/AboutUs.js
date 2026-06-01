import React from "react";
import styled from "styled-components";

import IntelliBridgeLogo from "../../assets/IntellibridgeLamp.png";
import { COLORS } from "../../themes/themes";

const AboutUsContainer = styled.div`
  padding: 40px;
  padding-top: 20vh;

  color: #fff;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;

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

export const FooterHeader = styled.h2`
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

export const FooterDescription = styled.p`
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

function AboutUs() {
  return (
    <AboutUsContainer>
      <BannerImage src={IntelliBridgeLogo} alt="IntelliBridge" />
      <FooterHeader>About Us</FooterHeader>
      <FooterDescription>
        Intellibridge is a curated intellectual capital infrastructure platform
        developed by Legacy Bridge Publishing to host, distribute, and monetize
        high-value leadership and performance-based knowledge. <br /> The
        platform is designed to transform how intellectual capital is accessed,
        structured, and scaled by integrating multiple layers of knowledge
        delivery within a single ecosystem. These include curated digital books,
        audiobooks, leadership frameworks, structured learning programs, and
        executive education resources. <br /> Unlike open content marketplaces,
        Intellibridge operates as a selective, high-integrity platform where
        only structured and high-value intellectual assets are admitted. Each
        author is positioned within the platform as a knowledge channel,
        enabling their ideas to extend beyond books into comprehensive
        intellectual ecosystems that include courses, insights, and strategic
        frameworks. <br /> <br /> The platform is built on a dual-layer model:{" "}
        <br />
        •⁠ ⁠Legacy Bridge Publishing — the intellectual capital studio
        responsible for extracting and structuring the ideas of high-impact
        leaders <br /> •⁠ ⁠Intellibridge — the infrastructure platform that
        distributes, curates, and monetizes those ideas globally. <br /> <br />{" "}
        Intellibridge also incorporates a structured onboarding and
        content-mapping system that aligns knowledge to users’ professional
        stages, leadership challenges, and growth pathways. This transforms
        content consumption into guided intellectual development. <br /> Through
        subscription access, learning programs, institutional licensing, and
        intellectual property monetization, the platform creates a multi-layer
        revenue architecture while preserving ownership and control of
        intellectual assets within a curated ecosystem. <br /> <br /> Over time,
        Intellibridge is positioned to become: <br /> •⁠ ⁠a global archive of
        influential thinkers <br /> •⁠ ⁠an executive learning ecosystem <br />{" "}
        •⁠ ⁠a marketplace for intellectual frameworks <br /> •⁠ ⁠and a
        distribution infrastructure for African and global intellectual capital
        <br /> <br />
        At its core, Intellibridge is not a publishing platform — it is
        infrastructure for structured influence and knowledge economies
      </FooterDescription>
    </AboutUsContainer>
  );
}

export default AboutUs;
