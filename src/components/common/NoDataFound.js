import React from "react";
import styled from "styled-components";

export const NoDataContainer = styled.div`
  padding: 20px;
//   margin-top: 20px;
  display: flex;
`;

export const NoDataText = styled.p`
  font-size: 20px;
  font-weight: "600";
  color: black;
`;

function NoDataFound({ noDataText }) {
  return (
    <NoDataContainer>
      <NoDataText>{noDataText}</NoDataText>
    </NoDataContainer>
  );
}

export default NoDataFound;
