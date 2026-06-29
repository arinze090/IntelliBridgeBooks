import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { usePaystackPayment } from "react-paystack";

import CustomSwitch from "../../components/switches/CustomSwitch";
import { COLORS } from "../../themes/themes";
import FormButton from "../../components/form/FormButton";
import { formatToNaira, slugify } from "../../Library/Common";
import CategoryCard from "../../components/common/CategoryCard";
import { IoBookOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { setUserDestination } from "../../redux/features/user/userSlice";
import axiosInstance from "../../utils/api-client";
import { toast } from "react-toastify";

const AuthorDetailsContainer = styled.div`
  padding: 40px;
  padding-top: 20vh;

  color: #fff;
  justify-content: center;
  display: flex;
  //   align-items: center;
  flex-direction: column;
  margin: 0 auto;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    align-items: center;
    padding: 5px;
    padding-top: 20vh;
  }
`;

const AuthorDetailSection = styled.section`
  display: flex;
  gap: 70px;
  align-items: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const AuthorImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AuthorImageWrapper = styled.div`
  //   width: 300px;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  //   border: 20px solid ${COLORS?.legacyBridgeSecondary};
  //   padding: 20px;

  @media (max-width: 768px) {
    width: 200px;
    height: 250px;
    // border: 10px solid ${COLORS?.legacyBridgeSecondary};
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  //   gap: 20px;
  max-width: 70%;
  justify-content: space-between;

  @media (max-width: 768px) {
    max-width: 100%;
    text-align: justify;
    gap: 10px;
    padding: 20px;
  }
`;

export const AuthorTitle = styled.h2`
  font-weight: bold;
  //   margin-bottom: 40px;
  font-size: 40px;
  color: black;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    margin-top: 10px;
    font-size: 30px;
  }
`;

export const AuthorBookTitle = styled.h4`
  font-weight: bold;
  //   margin-bottom: 40px;
  font-size: 30px;
  color: black;
  border-bottom: 1px solid #333;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    margin-top: 20px;
    font-size: 30px;
  }
`;

export const AuthorDescription = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  color: black;
  line-height: 1.6;
  //   max-width: 90%;

  @media (max-width: 768px) {
    align-items: center;
    margin-top: 20px;
    text-align: auto;
  }
`;

function BookDetailsPage({ props }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const loggedInUser = state?.user?.user;
  const reduxSelectedBook = state?.books?.selectedBook;
  console.log("reduxSelectedBook", reduxSelectedBook, loggedInUser);

  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);

  const updateSwitchData = (value) => {
    setActiveTab(value);
  };

  const bookDetailsData = [
    {
      optionTitle: "About Book",
    },
    {
      optionTitle: "About Author",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <AuthorDescription>
            {reduxSelectedBook?.description}
          </AuthorDescription>
        );

      case 1:
        return (
          <AuthorDescription>
            {reduxSelectedBook?.aboutAuthor}
          </AuthorDescription>
        );

      case 2:
        return <AuthorDescription>People love this book...</AuthorDescription>;

      default:
        return null;
    }
  };

  const bookCheckout = async (paymentMethod, paymentReference, paymentData) => {
    const bookOrder = {
      paymentMethod: paymentMethod,
      transactionReference: paymentReference,
      items: [reduxSelectedBook?._id],
      paymentData: paymentData,
    };

    console.log("bookOrder", bookOrder);

    setLoading(true);

    try {
      await axiosInstance({
        url: "/api/orders/checkout",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: bookOrder,
      }).then((res) => {
        setLoading(false);
        console.log("bookCheckout res", res);
        toast.success("Your purchase has been verified ✅");
        // RNToast(Toast, "Your purchase has been verified ✅");

        // save to redux the book purchased
        // dispatch(saveBoughtBooks(reduxSelectedBook));

        // navigation.navigate("Home", { screen: "HomeScreen" });
        navigate("/library");
      });
    } catch (error) {
      console.error("bookCheckout error:", error?.response);
      setLoading(false);
      toast.error("An error occured with your purchase");
      alert(
        "Payment Failed",
        `Your payment of ${formatToNaira(reduxSelectedBook?.price)} for ${
          reduxSelectedBook?.bookTitle
        } failed. If your account has been debited, please contact our support helpline to get it resolved`,
      );
    }
  };

  //   paystack integration segment
  const PAYSTACK_KEY = process.env.REACT_APP_PAYSTACK_LIVE_PUBLIC_KEY;

  const config = {
    reference: new Date().getTime().toString(),
    email: loggedInUser?.email,
    amount: reduxSelectedBook?.price * 100, // amount is in kobo here
    publicKey: PAYSTACK_KEY,
  };

  const onSuccess = (res) => {
    console.log("reference", res);
    const payStackPaymentReference = res?.reference;
    const paystackPaymentData = res;
    bookCheckout("paystack", payStackPaymentReference, paystackPaymentData);
  };

  const onClose = () => {
    console.log("closed");
  };
  const initializePayment = usePaystackPayment(config);

  const buyBookNow = () => {
    console.log("buyy", loggedInUser);

    if (!loggedInUser) {
      dispatch(
        setUserDestination(`book/${slugify(reduxSelectedBook?.bookTitle)}`),
      );
      navigate("/login");
    } else {
      initializePayment(onSuccess, onClose);
    }
  };

  return (
    <AuthorDetailsContainer>
      {/* Author Segment */}
      <AuthorDetailSection>
        <AuthorImageWrapper>
          <AuthorImage src={reduxSelectedBook?.bookImage} alt="Author" />
        </AuthorImageWrapper>

        <AuthorInfo>
          <AuthorTitle>{reduxSelectedBook?.bookTitle}</AuthorTitle>
          <AuthorDescription>By: {reduxSelectedBook?.author}</AuthorDescription>

          <div style={{ flexDirection: "row" }}>
            <CategoryCard
              icon={<IoBookOutline />}
              props={reduxSelectedBook?.category?.name}
            />
            <CategoryCard
              icon={<IoBookOutline />}
              props={reduxSelectedBook?.bookFormat}
            />
            <CategoryCard
              icon={<IoBookOutline />}
              props={reduxSelectedBook?.isbn}
            />
          </div>

          <FormButton
            title={`Buy Now ${formatToNaira(reduxSelectedBook?.price)}`}
            width={"100%"}
            marginTop={"30px"}
            onClick={buyBookNow}
          />
        </AuthorInfo>
      </AuthorDetailSection>

      {/* Book Details Switch */}
      <CustomSwitch
        arrayData={bookDetailsData}
        onSelectSwitch={updateSwitchData}
        seletionMode={0}
      />

      {renderContent()}
    </AuthorDetailsContainer>
  );
}

export default BookDetailsPage;
