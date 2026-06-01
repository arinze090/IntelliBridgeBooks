import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { AiOutlineMenu } from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { RiLogoutBoxLine } from "react-icons/ri";

import IntelliBridgeLogo from "../../assets/IntelliBridgeLogo.png";
import { signOut } from "../../redux/features/user/userSlice";
import { COLORS } from "../../themes/themes";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { removeBooksAfterSignOut } from "../../redux/features/books/booksSlice";

const Nav = styled.div`
  background: #0b0b0b;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 999;
  width: 100%;
  margin-top: 0px;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: rgba(0, 0, 0, 0.6);
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
  overflow-y: auto;
  max-height: 100vh;

  /* Hide scrollbar */
  overflow-y: auto; /* This allows scrolling but hides the scrollbar */

  /* Hide scrollbar for Chrome, Safari, and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge, and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const SidebarProfileSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  align-content: center;
  align-items: center;
  padding-right: 30px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const SidebarNavLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  align-content: center;
  align-items: center;
  padding-right: 30px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

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

const HamburgerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-right: 10px;
`;

const HamburgerMenu = ({ toggleSidebar, sidebar }) => (
  <div onClick={toggleSidebar} style={{ cursor: "pointer" }}>
    {sidebar ? (
      <AiIcons.AiOutlineClose size={30} color="white" />
    ) : (
      <AiOutlineMenu size={30} color="white" />
    )}
  </div>
);

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  function logout() {
    dispatch(signOut());
    dispatch(removeBooksAfterSignOut());

    navigate("/");
  }

  const isSmallScreen = window.innerWidth <= 1300;
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside the sidebar and if the sidebar is open
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebar(false); // Close sidebar
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebar]);

  return (
    <>
      <IconContext.Provider value={{ color: "#000" }}>
        <Nav>
          <NavIcon to="#">
            <HamburgerContainer>
              <HamburgerMenu toggleSidebar={showSidebar} sidebar={sidebar} />
            </HamburgerContainer>
          </NavIcon>

          <div
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // backgroundColor: "red",
              display: "flex",
              width: "90%",
              alignContent: "center",
              alignItems: "center",
              paddingRight: 10,
            }}
          >
            {!isSmallScreen ? (
              <div className="w-full flex flex-row items-center justify-end">
                <SidebarProfileSection>
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      alignContent: "center",
                      alignItems: "center",
                      marginLeft: 20,
                      cursor: "pointer",
                    }}
                  >
                    <FaIcons.FaBell
                      size={20}
                      color="white"
                      style={{ marginRight: 30 }}
                    />
                    <img
                      src={IntelliBridgeLogo}
                      alt="ProfilePicture"
                      style={{
                        borderRadius: 50,
                        width: 40,
                        height: 40,
                        objectFit: "contain",
                      }}
                    />
                    <div
                      style={{
                        flexDirection: "column",
                        display: "flex",
                        marginLeft: 10,
                      }}
                    >
                      <h5
                        style={{
                          margin: 0,
                          color: "white",
                          fontSize: 16,
                          fontWeight: "700",
                        }}
                      >
                        Admin
                      </h5>
                    </div>
                  </div>
                </SidebarProfileSection>
              </div>
            ) : (
              <HamburgerContainer>
                {/* <HamburgerMenu toggleSidebar={showSidebar} sidebar={sidebar} /> */}
              </HamburgerContainer>
            )}
          </div>
        </Nav>
        <SidebarNav sidebar={sidebar} ref={sidebarRef}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose
                style={{ color: "white" }}
                onClick={showSidebar}
              />
            </NavIcon>

            {SidebarData.map((item, index) => {
              return (
                <SubMenu item={item} key={index} closeSidebar={showSidebar} />
              );
            })}
            <SidebarLink to={"/"} onClick={logout}>
              <div
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <RiLogoutBoxLine style={{ color: "white" }} />
                <SidebarLabel>Log Out</SidebarLabel>
              </div>
            </SidebarLink>
            <div
              style={{ marginTop: 50, minHeight: 50, marginBottom: 100 }}
            ></div>
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
