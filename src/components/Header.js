import { FaSearch, FaUser, FaShoppingCart, FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push('/profile'); 
  };

  return (
    <header className="bg-gray-100 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Home Ease
          </Link>

          <div className="hidden md:flex space-x-6 ml-8">
            <Link href="/homes" className="text-gray-700 hover:text-blue-500">Homes</Link>
            <Link href="/beauty" className="text-gray-700 hover:text-blue-500">Beauty</Link>
            <Link href="/bookings" className="text-gray-700 hover:text-blue-500">Bookings</Link>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-white border rounded-full py-2 px-4 shadow-sm">
          <FaMapMarkerAlt className="text-blue-500" />
          <span className="text-gray-700">Dadar, Mumbai</span>
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-full py-2 px-4 pl-10 focus:outline-none focus:border-blue-500"
            />
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
          </div>

          <FaUser
            onClick={handleProfileClick} // Attach the click handler
            className="text-2xl text-gray-600 hover:text-blue-500 cursor-pointer"
          />
          <FaShoppingCart className="text-2xl text-gray-600 hover:text-blue-500 cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;
