import React from "react";
import { FormBtn } from "./FormElements";
import ErrorMessage from "./ErrorMessage";

function FormButton({
  title,
  onClick,
  width,
  marginLeft,
  marginTop,
  loading,
  btnIcon,
  errorMessage,
  mobileWidth,
  bgColor,
}) {
  return (
    <div
      style={{
        marginTop: marginTop,
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        // width: "100%",
        // backgroundColor: "red",
        // width: "100%",
        // alignContent: "center",
        // alignItems: "center",
      }}
    >
      {errorMessage && (
        <ErrorMessage message={errorMessage} textAlign={"center"} />
      )}

      <FormBtn
        width={width}
        marginLeft={marginLeft}
        onClick={onClick}
        disabled={loading}
        mobileWidth={mobileWidth}
        bgColor={bgColor}
      >
        {btnIcon ? btnIcon : null}{" "}
        {loading ? (
          <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          title
        )}
      </FormBtn>
    </div>
  );
}

export default FormButton;
