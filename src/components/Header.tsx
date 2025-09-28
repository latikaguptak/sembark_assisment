import { NavLink } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';
import { useAppSelector } from "../hooks/redux";


const Header = () => {
  const { totalQuantity } = useAppSelector((state) => state.cart);

  return (
    <nav className="sticky top-0 left-0 w-full z-10 bg-gradient-to-r from-yellow-200 via-green-300 to-rose-300 shadow-lg">
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
          
         
</div>
     
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 text-sm font-medium rounded-md transition duration-300 text-white ${
                isActive
                  ? "bg-white bg-opacity-20"
                  : "hover:-rotate-z-12 hover:scale-120 hover:bg-opacity-20"
              }`
            }
          >
            <FaShoppingCart className="mr-2 text-gray-700" />
            {totalQuantity > 0 && (
          <span className=" bg-blue-500 text-white rounded-full w-4 h-4 
                           flex items-center justify-center text-[10px] font-bold">
            {totalQuantity}
          </span>
        )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
