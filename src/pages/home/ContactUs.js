import React from "react";
import styled from "styled-components";

import IntelliBridgeLogo from "../../assets/IntellibridgeLamp.png";
import { COLORS } from "../../themes/themes";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";

const AboutUsContainer = styled.div`
  padding: 40px;
  padding-top: 15vh;

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

export const ContactSegment = styled.div`
  flex-direction: row;
  padding: 10px;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const ContactSegment2 = styled.div`
  flex-direction: column;
  padding: 10px;
  display: flex;
  width: 100%;
`;

export const IconSegment = styled.div`
  flex-direction: row;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  //   justify-content: center;
  //   align-contents: center;
  margin-bottom: 30px;
`;

export const IconSegmentText = styled.p`
  font-size: 20px;
  margin-left: 20px;
  color: black;
`;

function ContactMap() {
  return (
    <div style={{ width: "100%", height: "450px" }}>
      <iframe
        title="Google Map"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.339763233701!2d3.3430921745679836!3d6.60463322221609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b922c26e070d9%3A0xee35e3742ee4a2e7!2s5%2C%207%20Alh.%20Kofoworola%20Cres%2C%20Ikeja%2C%20101233%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2suk!4v1780267781792!5m2!1sen!2suk"
        allowFullScreen
      />
    </div>
  );
}

const contactData = [
  {
    name: "+234 815 982 5292",
    icon: <FaPhoneAlt color="black" />,
  },
  {
    name: "hello@legacybridgepublishing.com",
    icon: <IoMailSharp color="black" />,
  },
];

function ContactUs() {
  return (
    <AboutUsContainer>
      <BannerImage src={IntelliBridgeLogo} alt="IntelliBridge" />
      <FooterHeader>Conatct Us</FooterHeader>

      <FooterDescription>
        We’d love to hear from you! Whether you have questions, feedback, or
        just want to say hello, please don’t hesitate to reach out. Our team is
        dedicated to providing the best possible service and support. Contact us
        with the available details below, and we’ll get back to you as soon as
        possible. Your thoughts and inquiries are important to us, and we look
        forward to connecting with you!
      </FooterDescription>

      <ContactSegment>
        <ContactSegment2>
          {contactData?.map((cur, i) => (
            <IconSegment key={i}>
              {cur?.icon}
              <IconSegmentText>{cur?.name}</IconSegmentText>
            </IconSegment>
          ))}
        </ContactSegment2>

        <ContactMap />
      </ContactSegment>
    </AboutUsContainer>
  );
}

export default ContactUs;
