import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Layout from "./layout";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [ savedLog, setSavedLog ] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    let LoggedIn = JSON.parse(localStorage.getItem("users"))
    if (LoggedIn) {
      setSavedLog(LoggedIn)
    }
  }, [])

  function ProtectedRoute({
    children,
    isAuthentication,
    redirectTo = "/login",
  }) {
    if (!isAuthentication) {
      navigate(redirectTo);
    }

    return children;
  }

  return (
    <Routes>
      {/* public */}
      <Route
        path="/"
        element={
          <Layout>
            <Home></Home>
          </Layout>
        }
      ></Route>
      <Route
        path="/about"
        element={
          <Layout>
            <About></About>
          </Layout>
        }
      ></Route>
      <Route
        path="/products"
        element={
          <Layout>
            <Products></Products>
          </Layout>
        }
      ></Route>
      <Route
        path="/cart"
        element={
          <Layout>
            <Cart></Cart>
          </Layout>
        }
      ></Route>
      <Route
        path="/product/:id"
        element={
          <Layout>          
            <Details></Details>
          </Layout>
        }></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>

      {/* prootected */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute isAuthentication={savedLog}>
            <Layout>
              <Checkout></Checkout>
            </Layout>
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/orders"
        element={
          <ProtectedRoute isAuthentication={savedLog}>
            <Layout>
              <Orders></Orders>
            </Layout>
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

export default App;
