import {Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import CheckoutPage from "./pages/CheckOutPage"
import SuccessPage from "./pages/SuccessPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ProfilePage from "./pages/ProfilePage"
import AboutPage from "./pages/AboutPage"
import ReviewsPage from "./pages/ReviewsPage"

export default function AppRoutes({config}){
  return(
    <Routes>
        <Route path="/" element={<HomePage config={config}/>}/>
        <Route path="/products" element={<ProductsPage config={config}/>}/>
        <Route path="/product/:id" element={<ProductDetailPage config={config}/>}/>
        <Route path="/checkout" element={<CheckoutPage config={config}/>}/>
        <Route path="/success" element={<SuccessPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/about" element={<AboutPage config={config}/>}/>
        <Route path="/reviews" element={<ReviewsPage config={config}/>}/>
    </Routes>
  )
}
