import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../themes/themes";

const Container = styled.div`
  margin-top: 10px;
  border-radius: 8px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  margin-bottom: 20px;
  overflow-x: auto;
  white-space: nowrap;
  // padding-bottom: 1rem;

  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const NavItem = styled.button`
  padding: 0.5rem 1rem;
  border-bottom: ${(props) =>
    props.active ? `2px solid ${COLORS.legacyBridgePrimary}` : "none"};
  color: ${(props) => (props.active ? COLORS.legacyBridgePrimary : "#333")};
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  // border-bottom: 1px solid #ccc;

  transition:
    background 0.3s,
    color 0.3s;

  &:hover {
    color: ${COLORS.legacyBridgePrimary};
  }
`;

function CustomSwitch({ seletionMode, arrayData, onSelectSwitch }) {
  const [activeTab, setActiveTab] = useState(seletionMode);

  const updateSwitchData = (value) => {
    setActiveTab(value);
    onSelectSwitch(value);
  };

  return (
    <Container>
      <Nav>
        {arrayData?.map((tab, i) => (
          <NavItem
            key={tab}
            active={activeTab === i}
            onClick={() => {
              updateSwitchData(i);
            }}
          >
            {tab?.optionTitle}
          </NavItem>
        ))}
      </Nav>
    </Container>
  );
}

export default CustomSwitch;
