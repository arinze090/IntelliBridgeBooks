import React from "react";
import styled from "styled-components";

import IntelliBridgeLogo from "../../assets/IntelliBridgeWG.png";
import { COLORS } from "../../themes/themes";
import Modal from "../modal/Modal";

const AboutUsContainer = styled.div`
  padding: 20px;

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
  width: 90%;
  object-fit: cover;
  height: 20vh;
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

function LoginModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <AboutUsContainer>
        <BannerImage src={IntelliBridgeLogo} alt="IntelliBridge" />
        <FooterHeader>About Us</FooterHeader>
      </AboutUsContainer>
    </Modal>
  );
}

export default LoginModal;
