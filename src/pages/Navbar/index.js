import React, { useState, useEffect } from "react";

import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  Sidebar,
  Times,
} from "./NavbarElements";
import IntelliBridgeLogo from "../../assets/IntellibridgeLamp.png";
import IntelliBridgeLogo2 from "../../assets/IntelliBridgeWhiteGold.png";

import { navbarData } from "../../components/sidebar/SidebarData";
import { SmallNavBtn } from "./NavbarElements";
import { useDispatch, useSelector } from "react-redux";
import { FormBtn } from "../../components/form/FormElements";
import FormButton from "../../components/form/FormButton";
import { signOut } from "../../redux/features/user/userSlice";
import { removeBooksAfterSignOut } from "../../redux/features/books/booksSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const loggedInUser = state?.user?.user;

  const [scrollNav, setScrollNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  const logout = () => {
    dispatch(signOut());
    dispatch(removeBooksAfterSignOut());
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
    return () => {
      window.removeEventListener("scroll", changeNav);
    };
  }, []);

  return (
    <>
      <Nav scrollNav={scrollNav}>
        {isOpen ? (
          <Times onClick={toggleMenu} />
        ) : (
          <Bars onClick={toggleMenu} />
        )}

        {/* small screen size */}
        <Sidebar isOpen={isOpen}>
          {/* Sidebar content */}
          <img
            src={IntelliBridgeLogo2}
            alt="IntelliBridge-Logo"
            style={{
              width: "100%",
              height: 65,
              objectFit: "contain",
              justifyContent: "center",
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          />
          <SmallNavBtn>
            {navbarData?.map((item, index) => (
              <NavLink key={index} color={"#fff"} to={item?.path}>
                {item?.title}
              </NavLink>
            ))}
          </SmallNavBtn>
        </Sidebar>

        {/* regular screen size */}
        <NavMenu>
          <NavLink to="/">
            <img
              src={IntelliBridgeLogo}
              alt="IntelliBridge-Logo"
              style={{
                width: 150,
                height: 65,
                objectFit: "cover",
              }}
            />
          </NavLink>
        </NavMenu>
        <NavBtn>
          {navbarData?.map((item, index) => (
            <NavLink to={item?.path} color={"#fff"} key={index}>
              {item?.title}
            </NavLink>
          ))}

          {loggedInUser && <FormButton title={"Logout"} onClick={logout} />}
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
