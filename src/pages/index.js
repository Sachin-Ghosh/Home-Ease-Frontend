import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star, CheckCircle, Clock, Shield, ArrowRight, Users, CreditCard } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2 mb-10 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Your One-Stop Solution for Home Services</h1>
        <p className="text-xl mb-8">From cleaning to repairs, we've got all your home needs covered.</p>
        <Link href='/login'>
          <button className="bg-white text-blue-600 hover:bg-gray-100 py-2 px-6 rounded-lg text-lg font-semibold">Book a Service</button>
        </Link>
      </div>
      <div className="md:w-1/2">
        {/* Correcting the path to the video */}
        <video
          src="/assets/landing.mp4"  // Use correct relative path
          width={600}
          height={400}
          autoPlay
          loop
          muted
          playsInline
          className="rounded-lg shadow-xl"
        />
      </div>
    </div>
  </div>
</section>


        {/* Live Banner 1 */}
        <section className="bg-blue-100 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center">
              <span className="animate-pulse bg-red-500 rounded-full h-3 w-3 mr-2"></span>
              <p className="text-blue-600 font-semibold">Live: 50% off on all cleaning services for the next 24 hours!</p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Home Cleaning", icon: "🧹", description: "Professional cleaning services for a spotless home." },
                { title: "Plumbing", icon: "🚰", description: "Expert plumbing solutions for all your water-related issues." },
                { title: "Electrical Work", icon: "⚡", description: "Safe and reliable electrical services for your home." },
                { title: "Painting", icon: "🎨", description: "Transform your space with our professional painting services." },
                { title: "Carpentry", icon: "🔨", description: "Custom woodwork and repairs by skilled carpenters." },
                { title: "Appliance Repair", icon: "🔧", description: "Quick and efficient repairs for all your home appliances." },
              ].map((service, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <span className="mr-2 text-3xl">{service.icon}</span>
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{service.description}</p>
                    <Button variant="link" className="mt-4 text-blue-600">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Live Banner 2 */}
        <section className="bg-blue-600 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center">
              <span className="animate-pulse bg-yellow-300 rounded-full h-3 w-3 mr-2"></span>
              <p className="font-semibold">Live: 100+ professionals online now. Book instantly!</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Book a Service", icon: <CheckCircle className="h-12 w-12 text-blue-600" />, description: "Choose the service you need and select a convenient time slot." },
                { title: "Get Matched", icon: <Users className="h-12 w-12 text-blue-600" />, description: "We'll assign a qualified professional to fulfill your request." },
                { title: "Job Done", icon: <Star className="h-12 w-12 text-blue-600" />, description: "Your assigned professional will arrive and complete the job to your satisfaction." },
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  {step.icon}
                  <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Sarah Johnson", role: "Homeowner", comment: "Home Ease has been a lifesaver! Their cleaning service is top-notch, and I love how easy it is to book.", rating: 5 },
                { name: "Michael Chen", role: "Busy Professional", comment: "I've used their plumbing and electrical services. The professionals are always punctual and skilled.", rating: 4 },
                { name: "Emily Rodriguez", role: "Interior Designer", comment: "As an interior designer, I often recommend Home Ease to my clients. Their painting service is excellent!", rating: 5 },
              ].map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <Image src={`/placeholder.svg?height=40&width=40&text=${testimonial.name[0]}`} alt={testimonial.name} width={40} height={40} className="rounded-full mr-4" />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="mb-4">"{testimonial.comment}"</p>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Live Banner 3 */}
        <section className="bg-blue-100 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center">
              <span className="animate-pulse bg-green-500 rounded-full h-3 w-3 mr-2"></span>
              <p className="text-blue-600 font-semibold">Live: New service added - Home Organization! Book now and get 20% off.</p>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Latest from Our Blog</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "10 Quick Cleaning Hacks for a Spotless Home", image: "/placeholder.svg?height=200&width=400&text=Cleaning+Hacks", category: "Cleaning" },
                { title: "How to Prepare Your Home for the Winter Season", image: "/placeholder.svg?height=200&width=400&text=Winter+Prep", category: "Maintenance" },
                { title: "5 DIY Projects to Boost Your Home's Value", image: "/placeholder.svg?height=200&width=400&text=DIY+Projects", category: "Home Improvement" },
              ].map((post, index) => (
                <Card key={index}>
                  <Image src={post.image} alt={post.title} width={400} height={200} className="w-full h-48 object-cover" />
                  <CardContent className="pt-4">
                    <p className="text-sm text-blue-600 mb-2">{post.category}</p>
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <Button variant="link" className="text-blue-600 p-0">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" className="text-blue-600 border-blue-600">View All Posts</Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Experience Hassle-Free Home Services?</h2>
            <p className="text-xl mb-8">Join thousands of satisfied customers who trust Home Ease for all their home service needs.</p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">Get Started Today</Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Home Ease?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <CheckCircle className="h-12 w-12 text-blue-600" />, title: "Verified Professionals", description: "All our service providers are thoroughly vetted and background-checked." },
                { icon: <Clock className="h-12 w-12 text-blue-600" />, title: "On-Time Service", description: "We value your time. Our professionals always arrive within the scheduled time slot." },
                { icon: <Shield className="h-12 w-12 text-blue-600" />, title: "Satisfaction Guaranteed", description: "Not happy with the service? We'll make it right or your money back." },
                { icon: <CreditCard className="h-12 w-12 text-blue-600" />, title: "Secure Payments", description: "All transactions are processed securely. Pay only after the job is done." },
              ].map((feature, index) => (
                <Card key={index}>
                  <CardContent className="pt-6 text-center">
                    <div className="flex justify-center mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <Tabs defaultValue="booking" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="booking">Booking</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
              </TabsList>
              <TabsContent value="booking">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-2">How do I book a service?</h3>
                    <p>Booking a service is easy! Simply select the service you need, choose a convenient time slot, and confirm your booking. You'll receive a confirmation email with all the details.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="services">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-2">What services do you offer?</h3>
                    <p>We offer a wide range of home services including cleaning, plumbing, electrical work, painting, carpentry, and appliance repair. Check our services section for a full list.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="payment">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-2">When do I pay for the service?</h3>
                    <p>Payment is only required after the service has been completed to your satisfaction. We accept various payment methods including credit cards and digital wallets.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Stay Updated with Home Ease</h2>
            <p className="text-xl mb-8">Subscribe to our newsletter for home maintenance tips, special offers, and more!</p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex-grow">
                <Label htmlFor="email" className="sr-only">Email</Label>
                <Input id="email" placeholder="Enter your email" type="email" className="w-full" />
              </div>
              <Button type="submit" className="bg-white text-blue-600 hover:bg-gray-100">Subscribe</Button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}