import React from 'react';

export default function Banner() {
  return (
    <div className="container mx-auto">
      <div className="carousel w-full">
        {/* Slide 1 */}
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://i.ibb.co.com/rZvgXtv/banner-1.jpg"
            alt="Volunteer Help"
            className="w-full object-cover h-[300px] md:h-[500px]"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col text-center p-4">
            <h2 className="text-white text-xl md:text-3xl font-bold">
              Become a Helping Hand
            </h2>
            <p className="text-white text-sm md:text-lg mt-2">
              Join our efforts to make a difference in the community.
            </p>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>

        {/* Slide 2 */}
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://i.ibb.co.com/TM4MrcG/banner-2.jpg"
            alt="Thank You Volunteers"
            className="w-full object-cover h-[300px] md:h-[500px]"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col text-center p-4">
            <h2 className="text-white text-xl md:text-3xl font-bold">
              Thank You, Volunteers!
            </h2>
            <p className="text-white text-sm md:text-lg mt-2">
              Your dedication and time bring hope and smiles to those in need.
            </p>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>

        {/* Slide 3 */}
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://i.ibb.co.com/dW3ywTV/banner-3.jpg"
            alt="Volunteer Opportunities"
            className="w-full object-cover h-[300px] md:h-[500px]"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col text-center p-4">
            <h2 className="text-white text-xl md:text-3xl font-bold">
              Find Volunteer Opportunities
            </h2>
            <p className="text-white text-sm md:text-lg mt-2">
              Explore ways to give back and make a difference today.
            </p>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide4" className="btn btn-circle">❯</a>
          </div>
        </div>

        {/* Slide 4 */}
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src="https://i.ibb.co.com/Jx3stqF/banner-4.jpg"
            alt="Community Support"
            className="w-full object-cover h-[300px] md:h-[500px]"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col text-center p-4">
            <h2 className="text-white text-xl md:text-3xl font-bold">
              Support Your Community
            </h2>
            <p className="text-white text-sm md:text-lg mt-2">
              Together, we can build a brighter future for everyone.
            </p>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">❮</a>
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div>
      </div>
    </div>
  );
}
