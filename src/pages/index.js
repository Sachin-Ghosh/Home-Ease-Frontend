// import Image from "next/image";

// export default function Home() {
//   return (
//     <main
//       className=""
//     >
//       <div >
//         <h1>Home ease</h1>
//       </div>
//     </main>
//   );
// }

// pages/index.js
// pages/index.js
import Link from 'next/link';
import React from 'react';
import Meteors from "@/components/magicui/meteors";
import TypingAnimation from "@/components/ui/typing-animation";

export default function Home() {
  return (
    <div>
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-base-300 md:shadow-xl">
      <Meteors number={30} />
      <span className="pointer-events-none bg-gradient-to-b from-blue-900 to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-blue-900">
      Book Trusted Local Services!
        <TypingAnimation
      className="text-4xl font-bold  bg-gradient-to-b from-blue-900 to-gray-300/80 bg-clip-text text-center  leading-none text-transparent dark:from-white dark:to-blue-900"
      text="Find reliable service providers for all your home needs."
    />
      </span>
      <Link href="/login">
        <button className="btn btn-primary">Get Started</button>
        </Link>
    </div>
      
    <section className="py-10 bg-base-200">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold">Our Key Features</h2>
        <p className="text-base-content">Why choose us? We offer unique and reliable services.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front bg-primary">
              <h3 className="text-2xl">Reliable Services</h3>
            </div>
            <div className="flip-card-back bg-secondary">
              <p>Verified vendors, quality services with real reviews from customers.</p>
            </div>
          </div>
        </div>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front bg-primary">
              <h3 className="text-2xl">Instant Booking</h3>
            </div>
            <div className="flip-card-back bg-secondary">
              <p>Book services quickly with real-time availability for urgent needs.</p>
            </div>
          </div>
        </div>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front bg-primary">
              <h3 className="text-2xl">Location-based Matching</h3>
            </div>
            <div className="flip-card-back bg-secondary">
              <p>Find services near you, matched by your location.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="parallax bg-gray-800 text-white py-20">
      <div className="text-center">
        <h2 className="text-4xl font-bold">What Our Customers Say</h2>
      </div>
      <div className="flex justify-center mt-10 space-x-6">
        <div className="max-w-sm bg-gray-700 p-5 rounded-lg shadow-lg">
          <p className="italic">"HomeEase helped me find a reliable plumber within 30 minutes! Amazing service!"</p>
          <h3 className="text-lg font-semibold mt-4">- John Doe</h3>
        </div>
        <div className="max-w-sm bg-gray-700 p-5 rounded-lg shadow-lg">
          <p className="italic">"The instant booking feature is a game-changer!"</p>
          <h3 className="text-lg font-semibold mt-4">- Jane Smith</h3>
        </div>
      </div>
    </section>
      <main className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-semibold mb-4">Welcome to the Home Page</h1>
        <p className="text-gray-600 mb-4">Navigate to different pages from here:</p>
        <Link href="/home" className="text-blue-500 hover:underline">
          Go to HomePage1
        </Link>
      </main>
    </div>

  );
}
