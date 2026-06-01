import React from "react";
import { IoCopyOutline } from "react-icons/io5";
import styled from "styled-components";

import ErrorMessage from "./ErrorMessage";
import { COLORS } from "../../themes/themes";

const InputContainer = styled.div`
  width: ${({ width }) => width};
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : "0px")};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "transparent")};
  border-radius: 5px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 5px;
  color: ${({ color }) => (color ? color : "#000")};
  font-size: 1rem;
  border: 1px solid grey;
  background: transparent;

  &:focus {
    outline: none;
    border-color: ${COLORS.legacyBridgePrimary};
  }
`;

function FormInput({
  formTitle,
  inputPlaceholder,
  value,
  onChange,
  inputId,
  multiple,
  width,
  type,
  errorMessage,
  copyIcon,
  onCopyIconClick,
  inputBackgroundColor,
  inputColor,
  leftIcon,
  marginBottom,
}) {
  return (
    <InputContainer
      width={width}
      bgColor={inputBackgroundColor}
      marginBottom={marginBottom}
    >
      {formTitle && (
        <label
          style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}
          htmlFor="referral-code"
        >
          {formTitle}
        </label>
      )}

      {leftIcon && (
        <IoCopyOutline
          onClick={onCopyIconClick}
          style={{
            position: "absolute",
            right: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: "gray",
          }}
        />
      )}

      <Input
        type={type}
        id={inputId}
        placeholder={inputPlaceholder}
        value={value}
        onChange={onChange}
        multiple={multiple}
        color={inputColor}
        style={
          {
            // padding: "0.75rem",
            // borderRadius: 5,
            // fontSize: "1rem",
            // border: "1px solid grey",
            // fontFamily: "Montserrat, sans-serif",
            // backgroundColor: inputBackgroundColor
            //   ? inputBackgroundColor
            //   : "black",
            // color: inputColor ? inputColor : "white",
          }
        }
      />

      {copyIcon ? (
        <IoCopyOutline
          onClick={onCopyIconClick}
          style={{
            position: "absolute",
            right: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: "gray",
          }}
        />
      ) : null}

      {errorMessage && <ErrorMessage message={errorMessage} />}
    </InputContainer>
  );
}

export default FormInput;
