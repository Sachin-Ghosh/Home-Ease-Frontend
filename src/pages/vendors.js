// import React from 'react'

// const vendorPage = () => {
//   return (
//     <div className='h-screen'>
//      <div className='bg-red-950 h-60'>

//      </div>
//      <div className='mt-6 mb-5'>
//      <a className='text-4xl font-sans subpixel-antialiased  font-bold  ml-10 '>Available vendors</a>
//      </div>
   
//      <div className='border-t-2 border-black mb-8'/>
//      <div className='flex flex-col items-center	'>

// <div className='flex flex-row h-64 w-11/12 bg-slate-950 justify-between'> 
//     <div className='h-56 w-56 bg-slate-600'>
// hey
//     </div>
//     <div className='h-56 w-56 bg-slate-600'>
// hey
//     </div>
//     <div className='h-56 w-56 bg-slate-600'>
// hey
//     </div>

// </div>

// </div>
      
//     </div>
//   )
// }

// export default vendorPage

import { useRouter } from 'next/router';

const VendorPage = () => {
  const router = useRouter();
  const { image } = router.query; // Get the image URL from query params

  return (
    <div className='h-screen'>
      {/* Banner Section */}
      <div className='h-60' style={{ 
        backgroundImage: `url(${image})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}>
      </div>

      {/* Content Section */}
      <div className='mt-6 mb-5'>
        <a className='text-4xl font-sans subpixel-antialiased font-bold ml-10'>
          Available vendors
        </a>
      </div>
      <div className='border-t-2 border-black mb-8' />
      
      {/* Vendor Cards */}
      <div className='flex flex-col items-center'>
        <div className='flex flex-row h-64 w-11/12 bg-slate-950 justify-between'>
          <div className='h-56 w-56 bg-slate-600'>hey</div>
          <div className='h-56 w-56 bg-slate-600'>hey</div>
          <div className='h-56 w-56 bg-slate-600'>hey</div>
        </div>
      </div>
    </div>
  );
};

export default VendorPage;
