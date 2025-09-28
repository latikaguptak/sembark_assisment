import { Outlet } from "react-router"
import Header from './components/Header';
import CartBadge from "./components/CartBadge";
import Footer from "./components/Footer";
function App() {
  

  return (
   <div className="min-h-screen flex flex-col justify-between">
   <Header/>
   <Outlet/>
   <CartBadge/>
    <Footer />
   </div>
  )
}

export default App
