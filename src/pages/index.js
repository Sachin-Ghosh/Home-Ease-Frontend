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

export default function Home() {
  return (
    <div>
      <main className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-semibold mb-4">Welcome to the Home Page</h1>
        <p className="text-gray-600 mb-4">Navigate to different pages from here:</p>
        <Link href="/homePage" className="text-blue-500 hover:underline">
          Go to HomePage1
        </Link>
      </main>
    </div>
  );
}
