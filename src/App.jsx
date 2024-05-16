// App.js

import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import axios from "axios";
import { server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./redux/reducers/auth";
import { Toaster } from "react-hot-toast";
import { LayoutLoader } from "./layout/LayoutLoader";


const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProfilePage = lazy(()=>import("./pages/Profile"))

const App = () => {
  const { user, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null); 

  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => {
        console.log("Data from API:", data);
        dispatch(userExists(data.user));
        setUserData(data.user); // Set user data in state
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        dispatch(userNotExists());
      });
  }, [dispatch]);

  return loader ? (<LayoutLoader/>) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route path="/" element={<Product />} />

          <Route element={<ProtectRoute user={user} />}>
            <Route path="/register-product" element={<Home />} />
          </Route>

          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />

          <Route
            path="/profile"
            element={<ProfilePage userData={userData} />} // Pass userData to ProfilePage
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;
