import React from 'react'

export default function cart() {
  return (
    <div>
     <section className="bg-white py-8">
  <div className="max-w-2xl mx-auto">
    {/* Cart header */}
    <header className="flex items-center space-x-2 mb-8">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 text-purple-600">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l1.4-7H6.4l-.4 2M16 13l4-5m-4 5h-8M16 13V5h-8M6.4 5l.6-2m0 0h9.2l.6 2M5 5H2M1 1h3.4L6 13v8h12v-8h3l.4-2" />
      </svg>
      <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
    </header>

    {/* Service card 1 */}
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex items-start">
        <img
          src="https://example.com/service-icon-1.png"
          alt="Bathroom & Kitchen Cleaning"
          className="h-12 w-12 rounded-full mr-4"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800">Bathroom & Kitchen Cleaning</h3>
          <p className="text-sm text-gray-600">1 service • ₹89</p>
          <p className="text-sm text-gray-500 mt-1">Exhaust fan kitchen X 1</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex justify-between">
        <button className="text-sm font-semibold text-purple-600">Add Services</button>
        <button className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg">Checkout</button>
      </div>
    </div>

    {/* Note */}
    <div className="bg-yellow-100 text-yellow-700 text-center py-2 px-4 rounded-lg mb-6">
      Add services worth ₹310 more to checkout
    </div>

    {/* Service card 2 */}
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-start">
        <img
          src="https://example.com/service-icon-2.png"
          alt="Salon Prime for Kids & Men"
          className="h-12 w-12 rounded-full mr-4"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800">Salon Prime for Kids & Men</h3>
          <p className="text-sm text-gray-600">1 service • ₹259</p>
          <p className="text-sm text-gray-500 mt-1">Haircut for men X 1</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex justify-between">
        <button className="text-sm font-semibold text-purple-600">Add Services</button>
        <button className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg">Checkout</button>
      </div>
    </div>
  </div>
</section>
 
    </div>
  )
}
