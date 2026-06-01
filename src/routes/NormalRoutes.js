import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "../pages/Navbar";
import Login from "../pages/auth/Login";
import ScrollToTop from "../components/scrollToTop/ScrollToTop";
import Footer from "../pages/Footer";
import DownloadApp from "../pages/home/DownloadApp";

import AboutUs from "../pages/home/AboutUs";
import HomePage from "../pages/home/HomePage";
import ContactUs from "../pages/home/ContactUs";
import Bookstore from "../pages/bookstore/Bookstore";
import AuthorsPage from "../pages/authors/AuthorsPage";
import Register from "../pages/auth/Register";
import BecomeAuthor from "../pages/authors/BecomeAuthor";

function NormalRoutes() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<HomePage />} />

        {/*  Auth section */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/*  Genres listing section */}
        <Route path="/books" element={<DownloadApp />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />

        <Route path="/bookstore" element={<Bookstore />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/become-an-author" element={<BecomeAuthor />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default NormalRoutes;
