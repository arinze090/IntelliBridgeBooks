import styled from "styled-components";
import { COLORS } from "../../themes/themes";

export const FormBtn = styled.button`
  border-radius: 4px;
  background: ${({ bgColor }) => (bgColor ? bgColor : COLORS.legacyBridgePrimary)};
  padding: 10px 22px;
  width: ${({ width }) => (width ? width : "122px")};
  color: #fff;
  font-size: 18;
  font-weight: 600;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  // margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : "24px")};
  align-items: center;
  justify-content: center;
  align-content: center;
  display: flex;
  font-family: "Montserrat", sans-serif;

  /* Second Nav */
  //   &:hover {
  //     transition: all 0.2s ease-in-out;
  //     background: #fff;
  //     color: #808080;
  //   }

  @media screen and (max-width: 768px) {
    width: ${({ mobileWidth }) => (mobileWidth ? mobileWidth : "100%")};
    margin-left: ${({ mobileMarginLeft }) =>
      mobileMarginLeft ? mobileMarginLeft : "0"};
  }
`;

export const TransparentFormBtn = styled.button`
  border-radius: 4px;
  background: transparent;
  padding: 10px 22px;
  width: ${({ width }) => (width ? width : "122px")};
  color: ${({ color }) => (color ? color : "black")};
  font-size: 18;
  font-weight: 600;
  border: 1px solid ${COLORS.legacyBridgePrimary};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  // margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : "24px")};
  align-items: center;
  justify-content: center;
  align-content: center;
  display: flex;
  font-family: "Montserrat", sans-serif;

  &:hover {
    transition: all 0.2s ease-in-out;
    // color: ${({ hoverColor }) => (hoverColor ? "#fff" : "#fff")};
    border: 1px solid ${COLORS.legacyBridgePrimary};
  }

  @media screen and (max-width: 768px) {
    width: ${({ mobileWidth }) => (mobileWidth ? mobileWidth : "100%")};
    margin-left: ${({ mobileMarginLeft }) =>
      mobileMarginLeft ? mobileMarginLeft : "0px"};
  }
`;
