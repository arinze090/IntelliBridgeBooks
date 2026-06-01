import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Banner from "./Banner";
import Books from "./Books";
import Authors from "./Authors";
import DownloadApp from "./DownloadApp";
import axiosInstance from "../../utils/api-client";
import { saveBookOnlyData } from "../../redux/features/books/booksSlice";

function HomePage() {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const reduxBooksOnlyData = state?.books?.booksOnlyData;
  console.log("reduxBooksOnlyData", reduxBooksOnlyData);

  const [loading, setLoading] = useState(false);

  const fetchIntelliBooks = async () => {
    try {
      await axiosInstance("/api/books")
        .then((res) => {
          console.log("fetchIntelliBooks res", res);
          dispatch(saveBookOnlyData(res?.data));
          setLoading(false);
        })
        .catch((error) => {
          console.error("fetchIntelliBooks error:", error?.response);
          setLoading(false);
        });
    } catch (error) {
      console.error("fetchIntelliBooks error:", error?.response);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIntelliBooks();
  }, []);

  return (
    <>
      <Banner />
      <Books reduxBooksOnlyData={reduxBooksOnlyData} />
      <Authors reduxBooksOnlyData={reduxBooksOnlyData} />
      <DownloadApp />
    </>
  );
}

export default HomePage;
