import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ScrollToTop from "../components/scrollToTop/ScrollToTop";
import Sidebar from "../components/sidebar/Sidebar";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import BooksCategoryDashboard from "../pages/dashboard/BooksCategoryDashboard";
import UsersDashboard from "../pages/dashboard/UsersDashboard";
import BooksDashboard from "../pages/dashboard/booksDashboard/BooksDashboard";
import ViewBookPage from "../pages/dashboard/booksDashboard/ViewBookPage";
import CreateBook from "../pages/dashboard/booksDashboard/CreateBook";
import EditBook from "../pages/dashboard/booksDashboard/EditBook";

function ProtectedRoutes() {
  return (
    <Router>
      <ScrollToTop />
      <ToastContainer />
      <Sidebar />
      <Routes>
        <Route path="/" element={<AdminDashboard />} />

        <Route path="/books-dashboard" element={<BooksDashboard />} />
        <Route path="/books-dashboard/:id" element={<ViewBookPage />} />
        <Route path="/books-dashboard/create-book" element={<CreateBook />} />
        <Route path="/books-dashboard/edit-book/:id" element={<EditBook />} />

        <Route
          path="/books-genres-dashboard"
          element={<BooksCategoryDashboard />}
        />
        <Route path="/users-dashboard" element={<UsersDashboard />} />

        {/* <Route path="/search" element={<Search />} /> */}
      </Routes>
    </Router>
  );
}

export default ProtectedRoutes;
