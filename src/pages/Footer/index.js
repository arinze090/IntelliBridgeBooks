import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { COLORS } from "../../themes/themes";
import IntelliBridgeLogo from "../../assets/IntellibridgeLamp.png";
import AppStoreLogo from "../../assets/AppStoreImage.png";
import PlayStoreLogo from "../../assets/PlayStoreImage.png";
import { navbarData } from "../../components/sidebar/SidebarData";
import FormInput from "../../components/form/FormInput";
import FormButton from "../../components/form/FormButton";
// import "@fortawesome/fontawesome-free/css/all.min.css";

export const FooterContainer = styled.footer`
  background: ${COLORS.legacyBridgeSecondary};
  padding: 40px;
  color: #fff;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  // position: fixed;
  // width: 100%;
  // bottom: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const FooterSection = styled.div`
  flex: 1;
  padding: 10px;
  justify-content: center;
  align-items: ${({ alignItems }) => (alignItems ? alignItems : null)};
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  @media (max-width: 768px) {
    max-width: none;
    width: 100%;
    padding: 20px 0;
    align-items: center;
    margin-left: 0;
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
    width: 135px;
  }
`;

export const FollowUs = styled.p`
  margin-top: 40px;
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 0px;

  a {
    color: #fff;
    font-size: 24px;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

export const HelpLinks = styled.ul`
  list-style: none;
  padding: 0;
  justify-content: center;
  align-items: center;

  li {
    margin-bottom: 10px;
    // text-align: center;
    // background-color: red;

    a {
      color: ${COLORS.appGrey};
      text-decoration: none;

      &:hover {
        color: ${COLORS.legacyBridgePrimary};
      }
    }
  }
`;

export const SubscribeForm = styled.div`
  display: flex;
  flex-direcrion: row;
  align-items: center;
  margin-top: 10px;
  width: auto;
  align-content: center;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 20px;
    flex-direction: column;
  }
`;

export const Copyright = styled.div`
  margin-top: 20px;
  text-align: center;
  width: 100%;
  color: #bbb;

  @media (max-width: 768px) {
    margin-top: 40px;
  }
`;

export const FooterHeader = styled.h3`
  font-weight: bold;
  margin-bottom: 20px;
`;

export const FooterDescription = styled.p`
  color: ${COLORS.appGrey};
  margin-bottom: 10px;

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    color: ${COLORS.legacyBridgePrimary};
  }
`;

export const FooterNewsletter = styled.section`
  position: relative;
  width: 100%;
  overflow: hidden;
  background: ${COLORS.legacyBridgeSecondBlue};
  margin-bottom: 40px;
  padding: 40px;
  border-radius: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 5px;
  }
`;

export const FooterContent = styled.div`
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
    font-size: 20px;
  }
`;

export const BannerDescription = styled.p`
  color: #fff;
  font-size: 18px;
  margin-bottom: 40px;
  max-width: 60%;
  justify-content: center;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 14px;
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

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterNewsletter>
        {/* Newsletter subscription form can be added here */}
        <FooterContent>
          <BannerHeader>Subscribe to our Newsletter</BannerHeader>
          <BannerDescription>
            Stay updated with the latest news, book releases, and exclusive
            offers from IntelliBridge. Join our community of book lovers
            today!{" "}
          </BannerDescription>

          <SearchContainer>
            <FormInput
              inputPlaceholder="Email Address"
              width={"50%"}
              inputBackgroundColor={COLORS.legacyBridgeSecondary}
              inputColor={"#fff"}
              marginBottom={"0px"}
            />
            <FormButton
              title={"Subscribe"}
              marginTop={"0px"}
              bgColor={COLORS.legacyBridgeSecondary}
            />
          </SearchContainer>
        </FooterContent>
      </FooterNewsletter>
      <FooterSection alignItems={"flex-start"}>
        <Link to={"/"}>
          <Logo src={IntelliBridgeLogo} alt="IntelliBridge" />
        </Link>
        <FooterDescription>
          IntelliBridge by LegacyBridge Publishing Ltd is a leading platform for
          connecting authors and readers bringing you the best of both worlds.
        </FooterDescription>

        {/* App Store Badges */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 20,
            flexWrap: "wrap",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
          }}
        >
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
        </div>
      </FooterSection>

      {/* Quick Links */}
      <FooterSection alignItems={"flex-start"}>
        <FooterHeader>Quick Links</FooterHeader>
        <HelpLinks>
          {navbarData.map((item, index) => (
            <li key={index}>
              <a href={item?.path}>{item?.title}</a>
            </li>
          ))}
        </HelpLinks>
      </FooterSection>

      {/* Contact Us */}
      <FooterSection alignItems={"flex-start"}>
        <FooterHeader>Contact Us</FooterHeader>
        <FooterDescription>
          5/7, Alh Kofoworola Street,
          <br /> Ikeja Lagos, <br /> Nigeria.
        </FooterDescription>

        <FooterDescription>Phone: +234 815 982 5292</FooterDescription>

        <FooterDescription>
          Email:{" "}
          <a href="mailto:hello@legacybridgepublishing.com">
            hello@legacybridgepublishing.com
          </a>
        </FooterDescription>
      </FooterSection>

      <Copyright>
        © {currentYear} Copyright. IntelliBridge, A LegacyBridge Publishing Ltd,
        All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};
export default Footer;
