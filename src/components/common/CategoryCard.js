import React from "react";
import styled from "styled-components";

import { COLORS } from "../../themes/themes";

const CategoryCardContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  background-color: ${COLORS?.legacyBridgeSecondary};
  border-radius: 20px;
  padding: 10px 14px;
  margin-right: 10px;
  margin-bottom: 5px;
`;

const CategoryLabel = styled.span`
  margin-left: 16px;
`;

function CategoryCard({ icon, props }) {
  return (
    <CategoryCardContainer>
      {React.cloneElement(icon, {
        style: { color: "white" },
      })}
      <CategoryLabel>{props}</CategoryLabel>
    </CategoryCardContainer>
  );
}

export default CategoryCard;
