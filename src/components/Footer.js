import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h2 className="text-lg font-semibold mb-2">About Us</h2>
          <p className="text-sm mb-4">Contact Us</p>
        </div>
        <div className="text-center md:text-right">
          <h1 className="text-2xl font-bold mb-4">Home Ease</h1>
          <div className="flex justify-center md:justify-end space-x-6">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaFacebookF size={24} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
