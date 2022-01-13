import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom"
import {useSelector} from "react-redux"
import Productos from "../pages/Productos"
import PaginaProducto from "../pages/PaginaProducto"
import Home from "../pages/Home"
import Navbar from "../components/Navbar"
import Footer from '../components/Footer'
import AdminPanel from "../components/AdminPanel/AdminPanel"
import About from "../pages/About"
import Shop from "../pages/Shop"
import Page from "../pages/Page"
import Contact from "../pages/Contact"
import AdminProducts from "../components/AdminPanel/AdminHome/AdminProducts/AdminProducts"
import AdminHome from "../components/AdminPanel/AdminHome/AdminHome"
import NewProduct from "../components/AdminPanel/AdminHome/AdminProducts/NewProduct/NewProduct"
import CartScreen from "../pages/CartScreen"
export default function router() {
  const admin = useSelector((state) => state.authReducer.user?.admin)
  const isLoading = useSelector((state) => state.authReducer.isLoading)

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/page" element={<Page />} />
          <Route path="productos" element={<Productos />} />
          <Route path="producto/:id" element={<PaginaProducto />} />
          <Route path="/cart" element={<CartScreen />} />
          {isLoading ? (
            <Route exact path="/" element={<Home />} />
          ) : admin ? (
            <Route element={<AdminPanel />}>
              <Route exact path="admin" element={<AdminHome />} />
              <Route path="admin/products" element={<AdminProducts />} />

              {/*               <Route path="admin/users" element={<AdminUsers />} />
               */}
              <Route
                path="admin/products/newproduct"
                element={<NewProduct />}
              />
            </Route>
          ) : (
            <Route path="about" element={<About />} />
          )}
          <Route path="about" element={<About />} />
          <Route path="shop" element={<Shop />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}
