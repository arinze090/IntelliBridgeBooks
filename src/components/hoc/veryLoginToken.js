import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import { setUserDestination } from "../../redux/features/user/userSlice";
import { useLocation, useNavigate } from "react-router-dom";

export default function verifyLoginToken(WrappedComponent) {
  return (props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const state = useSelector((state) => state);

    const loggedInUser = state?.user?.user;

    const currentRoute = location.pathname.split("/")[1];
    console.log("currentRoute", currentRoute, loggedInUser);

    useEffect(() => {
      if (!loggedInUser) {
        dispatch(setUserDestination(currentRoute));

        navigate("/login");
      }
    }, [loggedInUser, currentRoute]);

    return <WrappedComponent {...props} />;
  };
}
