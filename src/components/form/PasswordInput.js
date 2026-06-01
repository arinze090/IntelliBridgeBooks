import React, { useState } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import ErrorMessage from "./ErrorMessage";
import { COLORS } from "../../themes/themes";

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

const PasswordInput = ({
  formTitle,
  width,
  value,
  onChange,
  errorMessage,
  inputColor,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        marginBottom: "1rem",
        width: width,
      }}
    >
      {formTitle && (
        <label
          style={{ marginBottom: "0.5rem", fontSize: "0.9rem", color: "black" }}
          htmlFor="referral-code"
        >
          {formTitle}
        </label>
      )}

      <Input
        type={passwordVisible ? "text" : "password"}
        placeholder="Enter your password"
        value={value}
        onChange={onChange}
        color={inputColor}
        // style={{
        //   padding: "0.75rem",
        //   paddingRight: "2.5rem", // Space for the icon
        //   fontSize: "1rem",
        //   borderColor: "gray",
        //   borderRadius: "5px",
        //   border: "1px solid grey",
        //   backgroundColor: "black",
        //   color: "white",
        // }}
      />
      {passwordVisible ? (
        <FaEyeSlash
          onClick={togglePasswordVisibility}
          style={{
            position: "absolute",
            right: "0.75rem",
            top: "60%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: "#ccc",
          }}
        />
      ) : (
        <FaEye
          onClick={togglePasswordVisibility}
          style={{
            position: "absolute",
            right: "0.75rem",
            top: "60%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: "#ccc",
          }}
        />
      )}

      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default PasswordInput;
