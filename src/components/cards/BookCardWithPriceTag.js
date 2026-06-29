import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { IoHeart, IoHeartOutline, IoBookOutline } from "react-icons/io5";

import {
  capitalizeFirstLetter,
  formatToNaira,
  slugify,
} from "../../Library/Common";
import { COLORS } from "../../themes/themes";
import { saveSelectedbook } from "../../redux/features/books/booksSlice";

const shimmer = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

const CardContainer = styled.div`
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 4px;
  background: white;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    width: 200px;
  }
`;

const Skeleton = styled.div`
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: 8px;
  background: linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.3s linear infinite;
`;

const BookImage = styled.img`
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  border-radius: 8px;
  display: ${({ hidden }) => (hidden ? "none" : "block")};
`;

const PriceTagContainer = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  background: ${COLORS.legacyBridgePrimary};
  padding: 8px 10px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

const OldPrice = styled.span`
  color: red;
  font-size: 11px;
  text-decoration: line-through;
`;

const PriceTag = styled.span`
  color: black;
  font-size: 13px;
  font-weight: 700;
`;

const Ribbon = styled.div`
  position: absolute;
  top: 20px;
  right: -42px;
  padding: 8px 42px;
  transform: rotate(40deg);
  font-size: 12px;
  font-weight: 700;
  background: ${({ isBlue }) => (isBlue ? COLORS.legacyBridgeBlue : "#fff")};
  color: ${({ isBlue }) => (isBlue ? "#fff" : "#000")};
  z-index: 2;
`;

const BookInfo = styled.div`
  margin-top: 12px;
`;

const BookTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
`;

const BookAuthor = styled.p`
  font-size: 14px;
  color: #555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Footer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BookFormat = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: black;
`;

const WishlistButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const BookCardWithPriceTag = ({
  props,
  onPress,
  wishlist = [],
  addWishlist,
  removeWishlist,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("BookCardWithPriceTag", props);
  const slugifiedBook = slugify(props?.bookTitle);
  // console.log("slugifiedBook", slugifiedBook);

  console.log("ppppp", props);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const isBookAddedToWishlist = wishlist.some(
    (book) => book?._id === props?._id,
  );

  const addToWishlist = (e) => {
    e.stopPropagation();

    if (isBookAddedToWishlist) {
      removeWishlist?.(props);
    } else {
      addWishlist?.(props);
    }
  };

  const handleBookClick = () => {
    dispatch(saveSelectedbook(props));
    navigate(`/book/${slugifiedBook}`);
  };

  return (
    <CardContainer onClick={handleBookClick}>
      {/* {isImageLoading && <Skeleton />} */}

      <BookImage
        src={props?.bookImage}
        alt={props?.bookTitle}
        hidden={isImageLoading}
        onLoad={() => setIsImageLoading(false)}
        onError={() => setIsImageLoading(false)}
      />

      {props?.isActive && !props?.isInLibrary ? (
        <PriceTagContainer>
          {props?.discountedPrice && (
            <OldPrice>{formatToNaira(props?.discountedPrice)}</OldPrice>
          )}
          <PriceTag>{formatToNaira(props?.price)}</PriceTag>
        </PriceTagContainer>
      ) : props?.isInLibrary ? (
        <Ribbon isBlue>Read Now</Ribbon>
      ) : (
        <Ribbon>Coming Soon</Ribbon>
      )}

      <BookInfo>
        <BookTitle>{props?.bookTitle}</BookTitle>
        <BookAuthor>By: {props?.author}</BookAuthor>
      </BookInfo>

      <Footer>
        <BookFormat>
          <IoBookOutline size={18} color={COLORS.legacyBridgePrimary} />
          <span>{capitalizeFirstLetter(props?.bookFormat)}</span>
        </BookFormat>

        <WishlistButton onClick={addToWishlist}>
          {isBookAddedToWishlist ? (
            <IoHeart size={20} color={COLORS.legacyBridgePrimary} />
          ) : (
            <IoHeartOutline size={20} color={COLORS.legacyBridgePrimary} />
          )}
        </WishlistButton>
      </Footer>
    </CardContainer>
  );
};

export default BookCardWithPriceTag;
