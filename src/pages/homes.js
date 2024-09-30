import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/components/Home"

export default function Homes() {
    return (
        <div>
            <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold mb-6">Home Services at Your Doorstep</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg shadow-lg p-4 bg-gray-100 h-full">
            <Home />
          </div>
          <div className="grid grid-cols-2 gap-2 h-full">
            <div className="flex flex-col h-full">
              <img
                src="/assets/image1.jpg"
                alt="Service Image 1"
                className="w-full h-3/5 object-cover rounded-lg"
              />
              <img
                src="/assets/image2.jpg"
                alt="Service Image 2"
                className="w-full h-2/5 object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col h-full">
              <img
                src="/assets/image3.jpg"
                alt="Service Image 3"
                className="w-full h-2/5 object-cover rounded-lg"
              />
              <img
                src="/assets/image4.jpg"
                alt="Service Image 4"
                className="w-full h-3/5 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
        </div>
    )
}