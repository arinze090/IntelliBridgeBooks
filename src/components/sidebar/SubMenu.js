import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../themes/themes";

const SidebarLink = styled(Link)`
  display: flex;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  list-style: none;
  height: 20px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #000;
    border-left: 4px solid ${COLORS.legacyBridgePrimary};
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const SubMenu = ({ item, closeSidebar }) => {
  return (
    <>
      <SidebarLink to={item.path} onClick={closeSidebar}>
        <div
          style={{
            alignContent: "center",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {React.cloneElement(item.icon, {
            style: { color: "white" },
          })}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
      </SidebarLink>
    </>
  );
};

export default SubMenu;
