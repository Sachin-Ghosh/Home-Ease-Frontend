import React, { useEffect } from 'react';
import KeenSlider from 'keen-slider';

export default function Blogs() {
  useEffect(() => {
    const keenSlider = new KeenSlider(
      '#keen-slider',
      {
        loop: true,
        defaultAnimation: {
          duration: 750,
        },
        slides: {
          origin: 'center',
          perView: 1,
          spacing: 16,
        },
        breakpoints: {
          '(min-width: 640px)': {
            slides: {
              origin: 'center',
              perView: 1.5,
              spacing: 16,
            },
          },
          '(min-width: 768px)': {
            slides: {
              origin: 'center',
              perView: 1.75,
              spacing: 16,
            },
          },
          '(min-width: 1024px)': {
            slides: {
              origin: 'center',
              perView: 3,
              spacing: 16,
            },
          },
        },
        created(slider) {
          const keenSliderActive = document.getElementById('keen-slider-active');
          const keenSliderCount = document.getElementById('keen-slider-count');
          slider.slides[slider.track.details.rel].classList.remove('opacity-40');
          keenSliderActive.innerText = slider.track.details.rel + 1;
          keenSliderCount.innerText = slider.slides.length;
        },
        slideChanged(slider) {
          slider.slides.forEach((slide) => slide.classList.add('opacity-40'));
          slider.slides[slider.track.details.rel].classList.remove('opacity-40');
          const keenSliderActive = document.getElementById('keen-slider-active');
          keenSliderActive.innerText = slider.track.details.rel + 1;
        },
      }
    );

    const keenSliderPrevious = document.getElementById('keen-slider-previous');
    const keenSliderNext = document.getElementById('keen-slider-next');

    keenSliderPrevious.addEventListener('click', () => keenSlider.prev());
    keenSliderNext.addEventListener('click', () => keenSlider.next());

    // Cleanup function to remove event listeners
    return () => {
      keenSliderPrevious.removeEventListener('click', () => keenSlider.prev());
      keenSliderNext.removeEventListener('click', () => keenSlider.next());
    };
  }, []); // Empty dependency array to run only on mount

  return (
    <div>
      <link href="https://cdn.jsdelivr.net/npm/keen-slider@6.8.6/keen-slider.min.css" rel="stylesheet" />

      <section className="bg-white py-12">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl font-bold tracking-tight text-blue-700 sm:text-5xl">
            Trusted Reviews from Our Customers
          </h2>

          <div className="mt-8">
            <div id="keen-slider" className="keen-slider">
              {/* Slider items */}
              {[
                {
                  name: 'Paul Starr',
                  image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
                  review: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa sit rerum incidunt, a consequuntur recusandae ab saepe illo est quia obcaecati neque quibusdam eius accusamus error officiis atque voluptates magnam!',
                },
                {
                  name: 'Jane Doe',
                  image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
                  review: 'This service has been excellent from the start. The team is always responsive and professional. I highly recommend them!',
                },
                {
                  name: 'John Smith',
                  image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1180&q=80',
                  review: 'The service quality is top-notch. I have never encountered any issues. Their customer support is superb and helpful.',
                },
                {
                  name: 'Emily Clark',
                  image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=1180&q=80',
                  review: 'I loved how they managed everything with such professionalism. I am impressed with their attention to detail and timely responses.',
                },
              ].map((testimonial, index) => (
                <div key={index} className="keen-slider__slide opacity-40 transition-opacity duration-500">
                  <blockquote className="rounded-lg bg-blue-50 p-6 shadow-sm sm:p-8 transition-transform duration-300 hover:scale-105">
                    <div className="flex items-center gap-4">
                      <img
                        alt=""
                        src={testimonial.image}
                        className="h-14 w-14 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex justify-center gap-0.5 text-blue-500">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              />
                            </svg>
                          ))}
                        </div>
                        <p className="mt-0.5 text-lg font-medium text-blue-900">{testimonial.name}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-700">
                      {testimonial.review}
                    </p>
                  </blockquote>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                aria-label="Previous slide"
                id="keen-slider-previous"
                className="text-blue-600 transition-colors hover:text-blue-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <p className="w-16 text-center text-sm text-blue-700">
                <span id="keen-slider-active"></span>
                /
                <span id="keen-slider-count"></span>
              </p>

              <button
                aria-label="Next slide"
                id="keen-slider-next"
                className="text-blue-600 transition-colors hover:text-blue-900"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
