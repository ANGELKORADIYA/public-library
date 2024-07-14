// src/App.jsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import "./app.css";

import { post } from "./Rest";
import Navbar from "./navbar/Navbar";
import Lander from "./login/Lander";
import Footer from "./gencomp/Footer";
import HomePage from "./gencomp/HomePage";
import BookDetailsForm from "./book/BookDetailsForm";
import UpdateBook from "./book/UpdateBook"
import Checkout from "./book/Checkout";
import ChekoutSystem from "./book/CheckoutSystem";
const App = () => {
  const [cookie, setCookie] = useState(document.cookie);
  const [isAuthenticated, setIsAuthenticated] = useState(!!cookie);
  const [role, setRole] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await post("email");
      if (res == false) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(!!cookie);
        setRole(res.role);
      }
    })();
  }, [cookie]);
  return (
    <Router>
      <ToastContainer />

      <Navbar
        isAuthenticated={isAuthenticated}
        role={role}
      />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <>
                <Lander type={null} changecookie={setCookie} />
              </>
            )
          }
        />

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <>
                <Lander type={"signIn"} changecookie={setCookie} />
              </>
            )
          }
        />

   
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <>
                <Lander type={"signUp"} changecookie={setCookie} />
              </>
            )
          }
        />

        <Route
          path="/contactus"
          element={
            <>

              <Footer />
            </>
          }
        />
        <Route
          path="/aboutus"
          element={
            <>

              <Footer />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <>
              <HomePage  role={role}/>
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/checkout" element={
          isAuthenticated? (
            <>
            {role === "member" ? <Checkout /> : ""}
            </>
          ) : (
            <Navigate to="/login" />
          )
        }/>
        <Route
          path="/addbook"
          element={
            isAuthenticated ? (
              <>
              {role === "librarian" ? <BookDetailsForm /> : ""}
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/updatebook"
          element={
            isAuthenticated ? (
              <>
              {role === "librarian" ? <UpdateBook /> : ""}
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/checkoutdetails"
          element={
            isAuthenticated ? (
              <>
              {role === "member" ? <ChekoutSystem /> : ""}
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<>Not Found</>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
