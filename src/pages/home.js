import Servicecard from '@/components/Servicecard';
import Header from '../components/Header';
import Services from '../components/Services';
import Footer from '@/components/Footer';
import TypingAnimation from '@/components/ui/typing-animation';
import Bestseller from '@/components/Bestseller';
import Banner1 from '@/components/Banner1';
import Blogs from '@/components/Blogs';

const VideoBanner = () => {
  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="/assets/banner1.mp4" // Replace with a video of your choice
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="flex justify-center items-center py-16 relative z-10">
        <TypingAnimation
          className="text-4xl font-extrabold text-white mb-6 mt-44 md:text-7xl"
          text="Home Services at Your Doorstep"
        />
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Typing Animation for Title */}

      {/* Video Banner Section */}
      <div className="relative z-10 mb-10 mt-10">
        <VideoBanner />
      </div>

      {/* Services and Image Grid Section */}
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Services Card Section */}
          <div className="bg-white p-6 rounded-2xl shadow-2xl transition transform hover:scale-105 border border-blue-100">
            <Services />
          </div>

          {/* Image Section with Better Layout and Hover Effects */}
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="flex flex-col gap-4">
              <img
                src="/assets/image1.jpg"
                alt="Service Image 1"
                className="w-full h-64 object-cover rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 border border-blue-100"
              />
              <img
                src="/assets/image2.jpg"
                alt="Service Image 2"
                className="w-full h-40 object-cover rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 border border-blue-100"
              />
            </div>
            <div className="flex flex-col gap-4">
              <img
                src="/assets/image3.jpg"
                alt="Service Image 3"
                className="w-full h-40 object-cover rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 border border-blue-100"
              />
              <img
                src="/assets/image4.jpg"
                alt="Service Image 4"
                className="w-full h-64 object-cover rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 border border-blue-100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Service Card Section */}
      <h1 className="text-4xl font-extrabold text-center mb-3 mt-10 text-blue-600 relative z-10">
        New and Noteworthy
      </h1>
      <div className="mb-8 relative z-10">
        <Servicecard />
      </div>

      <div className="flex justify-center items-center  relative z-10">
        <TypingAnimation
          className="text-4xl font-extrabold text-blue-600 md:text-4xl"
          text="Best Sellers Services"
        />
      </div>
      <div className="relative z-10">
        <Bestseller />
      </div>

      <div className="relative z-10">
        <Banner1 />
      </div>

      <div className="relative z-10">
        <Blogs />
      </div>

      {/* Footer Section */}
      {/* <Footer /> */}
    </div>
  );
}
