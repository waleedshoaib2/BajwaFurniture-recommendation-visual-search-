import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./scss/style.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import PrivateRoutes from "./utils/PrivateRoutes";
import AdminRoutes from "./utils/AdminRoutes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NewArrivals from "./pages/NewArrivals";
import AllProducts from "./pages/AllProducts";
import SuccessPayment from "./pages/SuccessPayment";
import ProductDetail from "./pages/ProductDetail";
import ShoppingCart from "./pages/ShoppingCart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDetailProfile from "./pages/UserDetailProfile";
import UserOrder from "./pages/UserOrder";
import UserOrderDetail from "./pages/UserOrderDetail";
import AdminUserList from "./pages/AdminUserList";
import AdminProductList from "./pages/AdminProductList";
import AdminOrderList from "./pages/AdminOrderList";
import AdminCreateProduct from "./pages/AdminCreateProduct";
import AdminEditProduct from "./pages/AdminEditProduct";
import AdminEditUser from "./pages/AdminEditUser";
import AdminEditOrder from "./pages/AdminEditOrder";
import Meta from "./components/Meta";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfServices from "./pages/TermsOfServices";
import AdminCategoryList from "./pages/AdminCategorylist/AdminCategoryList";
import AdminCreateCategory from "./pages/AdminCreateCategory/index";
import AdminEditCategory from "./pages/AdminCategoryEdit";
import AdminNewsletter from "./pages/AdminNewsletter";
import Newsletter from "./pages/Newsletter";
import CreatePost from "./pages/AdminCreateBlog";
import Blog from "./pages/Blog";
import AboutUs from "./pages/AboutUs";
import AOS from "aos";
import AdminGetBlogList from "./pages/AdminBlogList";
import "aos/dist/aos.css";
import EditPost from "./pages/AdminEditBlog";
import CustomerBlogList from "./pages/CustomerBlogList";

import AdminChat from "./pages/AdminChat";
import ChatRoom from "./pages/ChatRoom";
import ChatList from "./pages/CustomerChat";

function App() {
  React.useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Meta />
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/getallblogs" element={<AdminGetBlogList />} />
          <Route path="/editblog/:id" element={<EditPost />} />
          <Route path="/blogs" element={<CustomerBlogList />} />
          <Route path="/aboutus" element={<AboutUs />} />

          <Route path="/chats/:chatId" element={<ChatRoom />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/" element={<Home />} />
          <Route path="/newarrivals" element={<NewArrivals />} />
          <Route path="/shop" element={<AllProducts />} />

          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/successPayment" element={<SuccessPayment />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/legal" element={<TermsOfServices />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<UserDetailProfile />} />{" "}
            <Route path="/chat" element={<ChatList />} />
            <Route path="/orders" element={<UserOrder />} />
            <Route path="/order/:id" element={<UserOrderDetail />} />
          </Route>
          <Route element={<AdminRoutes />}>
            <Route path="/admin/userlist" element={<AdminUserList />} />
            <Route path="/admin/editUser/:id" element={<AdminEditUser />} />
            <Route path="/admin/productlist/" element={<AdminProductList />} />
            <Route
              path="/admin/categorylist/"
              element={<AdminCategoryList />}
            />
            <Route path="/admin/newsletter/" element={<AdminNewsletter />} />
            <Route
              path="/admin/editproduct/:id"
              element={<AdminEditProduct />}
            />
            <Route
              path="/admin/editcategory/:id"
              element={<AdminEditCategory />}
            />
            <Route path="/admin/chat" element={<AdminChat />} />

            <Route
              path="/admin/createproduct/"
              element={<AdminCreateProduct />}
            />
            <Route path="/admin/orderlist/" element={<AdminOrderList />} />
            <Route
              path="/admin/orderdetails/:id"
              element={<AdminEditOrder />}
            />
            <Route
              path="/admin/createcategory/"
              element={<AdminCreateCategory />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
