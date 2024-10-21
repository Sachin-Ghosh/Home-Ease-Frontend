'use client'

import { useState } from 'react'
import Image from 'next/image'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ServiceBooking() {
  // Initialize date with today's date
  const [date, setDate] = useState(new Date())

  // Function to handle date selection and log the selected date
  const handleDateSelect = (selectedDate) => {
    console.log('Selected date:', selectedDate)
    setDate(selectedDate)
  }

  // Available time slots for booking
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM',
  ]

  return (
    <div className=" mx-auto px-4 py-8 h-screen bg-white w-screen">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Service Information Section */}
        <div className='flex flex-col justify-center items-center'>
          <h1 className="text-3xl font-bold mb-4">Home Cleaning Service</h1>
          <Image
            src="/placeholder.svg?height=300&width=400"
            alt="Home Cleaning Service"
            width={400}
            height={300}
            className="rounded-lg mb-4"
          />
          <p className="text-gray-600 mb-4 text-center textarea-info">
            Our professional home cleaning service ensures your living space is spotless and hygienic. 
            Our experienced cleaners use eco-friendly products and pay attention to every detail.
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>Duration: 3 hours</li>
                <li>Price: $80</li>
                <li>Includes: Dusting, vacuuming, mopping, and bathroom cleaning</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Booking Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Schedule Service</h2>
          <div className="space-y-4">
            {/* Normal Booking Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">Normal Booking</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                  <DialogTitle>Schedule Normal Booking</DialogTitle>
                  <DialogDescription>
                    Choose a date and time for your service.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 py-4">
                  {/* New DatePicker Component */}
                  <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    inline
                    className="rounded-md border"
                  />
                  {/* Time Slots for selection */}
                  <div className="grid grid-cols-3 gap-2 w-full mt-4">
                    {timeSlots.map((slot) => (
                      <Button key={slot} variant="outline" className="w-full">
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Special Booking Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">Special Booking</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                  <DialogTitle className='bg-white'>Schedule Special Booking</DialogTitle>
                  <DialogDescription>
                    Choose a time for your special service.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 bg-white">
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <Button key={slot} variant="outline" className="w-full">
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Payment Button */}
          <Button className="w-96 mt-8 ml-44 bg-blue-500 text-white hover" >Pay Now</Button>
        </div>
      </div>
    </div>
  )
}
