import {Routes, Route, BrowserRouter} from "react-router-dom"
import {connect} from "react-redux"
import Productos from "../pages/Productos"
import PaginaProducto from "../pages/PaginaProducto"
import Home from "../pages/Home"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import AdminPanel from "../components/AdminPanel/AdminPanel"
import About from "../pages/About"
import Shop from "../pages/Shop"
import Page from "../pages/Page"
import Contact from "../pages/Contact"
import AdminProducts from "../components/AdminPanel/AdminHome/AdminProducts/AdminProducts"
import AdminHome from "../components/AdminPanel/AdminHome/AdminHome"
import NewProduct from "../components/AdminPanel/AdminHome/AdminProducts/NewProduct/NewProduct"
import CartScreen from "../pages/CartScreen"
import Filters from "../components/Filters/Filters"

function router(props) {
  const admin = props.user.admin
  const isLoading = props.isLoading

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/page" element={<Page />} />
          <Route path="/shop" element={<Productos />} />
          <Route path="/shop/:id" element={<PaginaProducto />} />
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
          <Route path="filters" element={<Filters />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  isLoading: state.authReducer.isLoading,
})

export default connect(mapStateToProps)(router)
