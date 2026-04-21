import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../components/common/ScrollToTop'

const MainLayout = () => {
  return <>
  <Navbar/>
  <ScrollToTop/>
  <Outlet/>
  <Footer />
  </>
}

export default MainLayout
