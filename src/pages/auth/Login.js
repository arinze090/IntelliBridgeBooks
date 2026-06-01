import React, { useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FormInput from "../../components/form/FormInput";
import PasswordInput from "../../components/form/PasswordInput";
import FormButton from "../../components/form/FormButton";
import axiosInstance from "../../utils/api-client";
import { getUser, saveAccessToken } from "../../redux/features/user/userSlice";
import { COLORS } from "../../themes/themes";
import IntelliBridgeLogo from "../../assets/IntellibridgeLamp.png";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: ${COLORS.white};
  padding-top: 130px;
  padding-bottom: 80px;
  // align-content: center;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    padding-top: 70px;
    margin-bottom: 0px;
    height: 100vh;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 40px;
  // max-width: 1200px;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  // background-color: #fff;
  // border-radius: 10px;
  // overflow: hidden;

  @media screen and (max-width: 768px) {
    margin: 20px;
  }
`;

const BannerImage = styled.img`
  width: 100%;
  object-fit: contain;
  height: 20vh;
  margin-bottom: 10px;
  background: ${COLORS.legacyBridgeSecondary};
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
    object-fit: contain;
    height: 40vh;
    margin-bottom: 40px;
  }
`;

const FormSection = styled.div`
  flex: 1;
  padding: 20px;
  // background: black;

  @media screen and (max-width: 768px) {
    padding-bottom: 40vh;
  }
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 30px;
  color: black;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    margin-top: 20px;
  }
`;

const Description = styled.p`
  margin-bottom: 40px;
  font-size: 15px;
  color: black;
  margin-right: 10px;
  // width: 100%;

  @media (max-width: 768px) {
    align-items: center;
    margin-top: 15px;
  }
`;

export const LoginLink = styled(Link)`
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : "0px")};
  justify-content: flex-end;
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : "flex-end"};

  display: flex;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : "0px")};
  width: ${({ width }) => (width ? width : null)};
  color: ${COLORS.legacyBridgePrimary};

  a {
    display: inline-block;
    margin-right: 10px;
  }

  a:hover {
    color: ${COLORS.legacyBridgePrimary};
  }

  img {
    width: 200px;
  }
`;

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const reduxUserDestination = state?.user?.destination;
  console.log("state", state, reduxUserDestination);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const login = async () => {
    const loginData = {
      email: email,
      password: password,
    };

    setLoading(true);

    if (!password) {
      setFormError("Invalid Login details, please try again");
    } else {
      setLoading(true);
      try {
        await axiosInstance({
          url: "/api/auth/login/",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: loginData,
        }).then((res) => {
          setLoading(false);
          // console.log("loginResponse", res);
          if (res?.status === 200) {
            toast.success("Login Successful");
            dispatch(getUser(res?.data));
            dispatch(saveAccessToken(res?.data?.token));

            navigate(`/${reduxUserDestination}`);
          } else {
            toast.error("Login Failed. Please check your credentials.");
            setFormError("Login Failed. Please check your credentials.");
          }
        });
      } catch (error) {
        console.log("Login error", error?.response);
        toast.error("Login Failed, Please try again later");

        if (error?.response?.data?.message?.includes("Invalid")) {
          toast.error("Login Failed. Please check your credentials.");
        }
        setLoading(false);
      }
    }
  };

  return (
    <Container>
      <FormContainer>
        <BannerImage src={IntelliBridgeLogo} alt="IntelliBridge" />

        <FormSection>
          <Title>Welcome Back</Title>
          <Description>Login to access bookstores and many more</Description>

          <FormInput
            type={"email"}
            formTitle={"Email Address"}
            inputPlaceholder={"Email address"}
            multiple={false}
            inputId={"email"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFormError("");
              setEmailError("");
            }}
            errorMessage={emailError}
            inputColor={"black"}
            marginBottom={"20px"}
          />

          <PasswordInput
            formTitle={"Password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFormError("");
              setPasswordError("");
            }}
            errorMessage={passwordError}
          />

          <LoginLink
            to={"/forgot-password"}
            marginBottom={"10px"}
            marginTop={"10px"}
          >
            Forgot Password?
          </LoginLink>

          <FormButton
            title={"Login"}
            width={"100%"}
            onClick={login}
            marginLeft={"0px"}
            loading={loading}
            errorMessage={formError}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              marginTop: 10,
              width: "100%",
            }}
          >
            <Description style={{ margin: 0 }}>
              Don't have an account?
            </Description>

            <LoginLink to={"/register"}>Sign Up</LoginLink>
          </div>
        </FormSection>
      </FormContainer>
    </Container>
  );
}

export default Login;
