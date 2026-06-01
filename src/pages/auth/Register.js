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
import { normalizeEmail } from "../../Library/Common";
import { checkPassword } from "../../Library/Validation";

const Container = styled.div`
  display: flex;
  height: auto;
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

export const BannerImage = styled.img`
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
  height: auto;

  @media screen and (max-width: 768px) {
    margin-bottom: 50vh;
    margin-top: 20vh;
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

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const reduxUserDestination = state?.user?.destination;
  console.log("state", state, reduxUserDestination);

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [formError, setFormError] = useState("");

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

  const register = async () => {
    const registerData = {
      email: normalizeEmail(email),
      fullname: fullName,
      username: username,
      password: password,
      source: "web",
    };

    console.log("registerData", registerData);

    if (checkPassword(password)?.isValid === false) {
      setFormError(checkPassword(password)?.cause);
      setLoading(false);
      return;
    } else {
      setLoading(true);

      try {
        await axiosInstance({
          url: "/api/auth/signup/",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: registerData,
        }).then((res) => {
          setLoading(false);
          console.log("registerResponse", res);
          if (res?.status === 201 && res?.data) {
            toast.success("Registration Successful");
            navigate("/EmailVerification", {
              email: normalizeEmail(email),
            });
          } else {
            toast.error("Registration Failed. Please check your credentials.");
            setFormError("Registration Failed. Please check your credentials.");
          }
        });
      } catch (error) {
        console.error("Register check error:", error?.response);
        setLoading(false);

        if (error?.response?.data?.message?.includes("already exists")) {
          toast.error(
            "The username or email you chose already exists in our platform, try using another username or email",
          );

          setFormError(
            "The username or email you chose already exists in our platform, try using another username or email",
          );
        } else if (
          error?.response?.data?.message?.includes("Account already exists")
        ) {
          toast.error(
            "You already have an account with us, please login to enjoy our services",
          );
          setFormError(
            "You already have an account with us, please login to enjoy our services",
          );
        } else if (
          error?.response?.data?.message?.includes("Username already exists")
        ) {
          toast.error(
            "The username you chose already exists in our platform, try using another username",
          );
          setFormError(
            "The username you chose already exists in our platform, try using another username",
          );
        } else if (
          error?.response?.data?.message?.includes("Password must be")
        ) {
          toast.error("Password must be at least 8 characters long");
          setFormError("Password must be at least 8 characters long");
        } else {
          toast.error("Something went wrong, please try again later");
        }
      }
    }
  };

  return (
    <Container>
      <FormContainer>
        <BannerImage src={IntelliBridgeLogo} alt="IntelliBridge" />

        <FormSection>
          <Title>Create an Account</Title>
          <Description>
            Please fill on your information to create account
          </Description>

          <FormInput
            type={"default"}
            formTitle={"Full Name"}
            inputPlaceholder={"Full Name"}
            multiple={false}
            inputId={"fullName"}
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setFormError("");
              setFullNameError("");
            }}
            errorMessage={fullNameError}
            inputColor={"black"}
            marginBottom={"20px"}
          />

          <FormInput
            type={"default"}
            formTitle={"Username"}
            inputPlaceholder={"Username"}
            multiple={false}
            inputId={"username"}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setFormError("");
              setUsernameError("");
            }}
            errorMessage={usernameError}
            inputColor={"black"}
            marginBottom={"20px"}
          />

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
            inputColor={"black"}
          />

          <FormButton
            title={"Sign Up"}
            width={"100%"}
            onClick={register}
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
              Already have an account?
            </Description>

            <LoginLink to={"/login"}>Login</LoginLink>
          </div>
        </FormSection>
      </FormContainer>
    </Container>
  );
}

export default Register;
