import React from "react";
import styled from "styled-components";
import ErrorMessage from "./ErrorMessage";
import { COLORS } from "../../themes/themes";

const InputContainer = styled.div`
  width: ${({ width }) => width};
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Input = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 5px;

  font-size: 1rem;
  border: 1px solid grey;
  background: ${({ background }) => (background ? background : "transparent")};
  color: ${({ color }) => (color ? color : "#000")};

  &:focus {
    outline: none;
    border-color: ${COLORS.legacyBridgePrimary};
  }
`;

function FormTextArea({
  formTitle,
  width,
  value,
  onChange,
  row,
  placeholder,
  errorMessage,
  maxLength,
  inputBackgroundColor,
  inputColor,
  disabled,
  editable = true,
}) {
  return (
    <InputContainer width={width}>
      <label
        style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}
        htmlFor="referral-code"
      >
        {formTitle}
      </label>
      <Input
        maxLength={maxLength ? maxLength : 100}
        rows={row}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={
          {
            // width: "98%",
            // padding: "0.75rem",
            // fontSize: "1rem",
            // borderColor: "gray",
            // borderRadius: "5px",
            // backgroundColor: inputBackgroundColor
            //   ? inputBackgroundColor
            //   : "black",
            // color: inputColor ? inputColor : "white",
          }
        }
      />
      <ErrorMessage message={errorMessage} />
    </InputContainer>
  );
}

export default FormTextArea;
