import Servicecard from '@/components/Servicecard';
import Header from '../components/Header';
import Services from '../components/Services';
import Footer from '@/components/Footer';
import TypingAnimation from '@/components/ui/typing-animation';
import Bestseller from '@/components/Bestseller';
import Banner1 from '@/components/Banner1';

export default function HomePage1() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-200 overflow-hidden">
      {/* Background RetroGrid */}
      
      {/* Typing Animation for Title */}
      <div className="flex justify-center items-center py-16 relative z-10">
        <TypingAnimation
          className="text-4xl font-extrabold text-gray-800 dark:text-white mb-6 mt-10 md:text-6xl"
          text="Home Services at Your Doorstep"
        />
      </div>
      
      {/* Services and Image Grid Section */}
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Services Card Section */}
          <div className="bg-white p-6 rounded-2xl shadow-2xl transition transform hover:scale-105">
            <Services />
          </div>

          {/* Image Section with Better Layout and Hover Effects */}
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="flex flex-col gap-4">
              <img
                src="/assets/image1.jpg"
                alt="Service Image 1"
                className="w-full h-64 object-cover rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
              />
              <img
                src="/assets/image2.jpg"
                alt="Service Image 2"
                className="w-full h-40 object-cover rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="flex flex-col gap-4">
              <img
                src="/assets/image3.jpg"
                alt="Service Image 3"
                className="w-full h-40 object-cover rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
              />
              <img
                src="/assets/image4.jpg"
                alt="Service Image 4"
                className="w-full h-64 object-cover rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Service Card Section */}
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-black text-center mb-3 mt-10 relative z-10">
        New and noteworthy
      </h1>
      <div className="mb-8 relative z-10">
        <Servicecard />
      </div>
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-black text-center mb-8 mt-10 relative z-10">
        Best Seller Services
      </h1>
      <div className="relative z-10">
        <Bestseller />
      </div>
      <div className="relative z-10">
        <Banner1 /> 
      </div>
      {/* Footer Section */}
    
    </div>
  );
}
