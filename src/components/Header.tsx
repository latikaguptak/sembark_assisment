import { NavLink } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';


const Header = () => {


  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-gradient-to-r from-yellow-200 via-green-300 to-rose-300 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
 
        <div className=" bg-clip-text bg-gradient-to-l from-blue-400 to-purple-500 text-transparent "><span className="text-2xl font-bold">SEMBARK Store</span></div>

        <div className="flex space-x-4">
            <div className="flex space-x-4 justify-center items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 text-sm font-medium rounded-md transition duration-300 text-gray-700 ${
                isActive
                  ? "bg-white bg-opacity-20"
                  : "hover:bg-white hover:scale-125 hover:bg-opacity-20"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `px-3 py-2 text-sm font-medium rounded-md transition duration-300 text-gray-700 ${
                isActive
                  ? "bg-white bg-opacity-20"
                  : "hover:bg-white hover:bg-opacity-20"
              }`
            }
          >
            Product
          </NavLink>
</div>
     
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 text-sm font-medium rounded-md transition duration-300 text-white ${
                isActive
                  ? "bg-white bg-opacity-20"
                  : "hover:rotate-12 hover:scale-120 hover:bg-opacity-20"
              }`
            }
          >
            <FaShoppingCart className="mr-2" />
            <span className="font-semibold"></span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
