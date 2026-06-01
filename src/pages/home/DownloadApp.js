import React from "react";
import styled from "styled-components";

import { COLORS } from "../../themes/themes";
import AppStoreLogo from "../../assets/AppStoreImage.png";
import PlayStoreLogo from "../../assets/PlayStoreImage.png";
import AppVideo from "../../assets/AppVideo.mp4";

export const FooterContainer = styled.footer`
  background: ${COLORS.legacyBridgeSecondBlue};
  padding: 40px;
  color: #fff;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const Logo = styled.img`
  width: 300px;
  object-fit: cover;
  height: 90px;
  //   background-color: red;
`;

export const AppStoreBadges = styled.div`
  margin-top: 10px;

  a {
    display: inline-block;
    margin-right: 10px;
  }

  img {
    width: 200px;
  }
`;

export const AppStoreSegment = styled.div`
  display: flex;
  gap: 10;
  margintop: 20;
  flexwrap: "wrap";
  flexdirection: "row";
  aligncontent: "center";
  alignitems: "center";
`;

export const FooterHeader = styled.h2`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 30px;
  color: black;
`;

export const FooterDescription = styled.p`
  color: ${COLORS.appGrey};
  margin-bottom: 10px;
  max-width: 650px;
  color: black;
`;

export const AppImageBadge = styled.img`
  width: 100%;
  max-width: 300px;
  object-fit: cover;
  height: auto;
  margin-top: 20px;
`;

export const AppVideoBadge = styled.video`
  width: 100%;
  max-width: 500px;
  object-fit: cover;
  height: auto;
  margin-top: 20px;
  autoplay: true;
  loop: true;
  muted: true;
`;

function DownloadApp() {
  return (
    <FooterContainer>
      <FooterHeader>Download our Mobile App</FooterHeader>
      <FooterDescription>
        Experience a world of stories at your fingertips with the IntelliBridge
        App. Access a vast library of books; read on the go, anywhere, anytime –
        all from your mobile device. You’re always just a click away from your
        next page-turner or updates on latest book releases. The IntelliBridge
        App is your go-to companion for all things books.
      </FooterDescription>

      {/* App Store Badges */}
      <AppStoreSegment>
        <AppStoreBadges>
          <a href="https://play.google.com/store/apps/details?id=com.intellibridge">
            <img src={PlayStoreLogo} alt="Google Play" />
          </a>
        </AppStoreBadges>
        <AppStoreBadges>
          <a href="https://apps.apple.com/ca/app/intellibridge/id6761785196">
            <img src={AppStoreLogo} alt="App Store" />
          </a>
        </AppStoreBadges>
      </AppStoreSegment>

      {/* App Image */}
      <AppVideoBadge src={AppVideo} autoPlay loop muted playsInline />
    </FooterContainer>
  );
}

export default DownloadApp;
