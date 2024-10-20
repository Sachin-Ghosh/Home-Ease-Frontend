import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Star, Users, Zap } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Trusted Home Services Partner</h2>
                <p className="text-xl text-gray-600 mb-6">We connect you with skilled professionals to take care of all your home service needs.</p>
                <Button size="lg">Book a Service</Button>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Home Services"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
                  Quality Assured
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>All our professionals are vetted and undergo strict quality checks.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-6 h-6 mr-2 text-yellow-500" />
                  Fast & Efficient
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Get quick responses and efficient service delivery for all your needs.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-6 h-6 mr-2 text-blue-500" />
                  Wide Range of Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>From plumbing to electrical work, we cover all your home service requirements.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-6 h-6 mr-2 text-purple-500" />
                  Highly Rated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Our services consistently receive top ratings from satisfied customers.</p>
              </CardContent>
            </Card>
          </div>

          {/* Mission Statement */}
          <div className="mt-16 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Our Mission</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>We strive to revolutionize the home services industry by providing a seamless platform that connects skilled professionals with homeowners, ensuring quality, reliability, and satisfaction in every service rendered.</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 bg-blue-700 rounded-lg shadow-xl overflow-hidden">
            <div className="px-4 py-5 sm:p-6 text-center">
              <h3 className="text-2xl leading-6 font-medium text-white mb-4">Ready to experience top-notch home services?</h3>
              <Button size="lg" variant="secondary">Get Started Today</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}