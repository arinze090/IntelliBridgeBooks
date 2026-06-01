import React from "react";
import styled from "styled-components";
import { COLORS } from "../../themes/themes";

export const AuthorCard = styled.div`
  width: 350px;
  height: 350px;
  display: flex;
  padding: 30px;
  background: ${COLORS.legacyBridgeSecondBlue};
  align-items: center;
  align-content: center;
  border-radius: 20px;
//   justify-content: space-between;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 170px;
    height: 200px;
  }
`;

export const AuthorDetails = styled.div`
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  display: flex;
`;

export const CardHeader = styled.h2`
  font-weight: bold;
  //   margin-bottom: 20px;
  font-size: 25px;
  color: black;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    margin-top: 20px;
  }
`;

export const CardDescription = styled.p`
  margin-bottom: 20px;
  font-size: 15px;
  color: black;
  max-width: 80%;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    margin-top: 15px;
  }
`;

export const CardIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  //   width: 50px;
  //   height: 50px;
  border-radius: 50%;
  background: white;
  padding: 15px;
  margin-bottom: 20px;
  top: 10;
`;

function ManuscriptCard({ props }) {
  return (
    <AuthorCard>
      <CardIconContainer>{props?.icon}</CardIconContainer>

      <AuthorDetails>
        <CardHeader>{props?.title}</CardHeader>
        <CardDescription>{props?.description}</CardDescription>
      </AuthorDetails>
    </AuthorCard>
  );
}

export default ManuscriptCard;
