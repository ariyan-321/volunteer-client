import React from "react";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <div className="bg-green-50 text-green-900 min-h-screen py-10 px-5 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          About Volunteer Hub
        </h1>
        <p className="text-lg md:text-xl text-center mb-12 leading-relaxed">
          Volunteer Hub is your one-stop platform for connecting volunteers and organizers. 
          Whether you want to contribute to your community or need dedicated volunteers for a project, 
          Volunteer Hub bridges the gap between passionate individuals and meaningful causes.
        </p>

        <section className="space-y-8">
          <div className="p-6 bg-green-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-base md:text-lg leading-relaxed">
              Our mission is to foster a culture of giving and collaboration. We aim to empower 
              individuals by making volunteering opportunities accessible and meaningful while helping 
              organizations achieve their goals with the right people.
            </p>
          </div>

          <div className="p-6 bg-green-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Volunteer Hub?</h2>
            <ul className="list-disc pl-6 text-base md:text-lg leading-relaxed space-y-2">
              <li>
                <span className="font-semibold">Simple & Intuitive:</span> 
                Our platform is designed for ease of use, making it simple to find and join volunteer opportunities.
              </li>
              <li>
                <span className="font-semibold">Diverse Opportunities:</span> 
                From education to healthcare, we feature a wide range of causes to support.
              </li>
              <li>
                <span className="font-semibold">Secure Platform:</span> 
                We prioritize your safety with secure authentication and reliable partnerships.
              </li>
            </ul>
          </div>

          <div className="p-6 bg-green-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <ol className="list-decimal pl-6 text-base md:text-lg leading-relaxed space-y-2">
              <li>
                <span className="font-semibold">Browse Opportunities:</span> 
                Discover projects and causes that align with your passion and skills.
              </li>
              <li>
                <span className="font-semibold">Join a Cause:</span> 
                Apply to become a volunteer or post your own volunteer needs as an organizer.
              </li>
              <li>
                <span className="font-semibold">Make an Impact:</span> 
                Work together to bring positive change to your community and beyond.
              </li>
            </ol>
          </div>

          <div className="p-6 bg-green-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-base md:text-lg leading-relaxed">
              We envision a world where everyone has the opportunity to contribute, collaborate, 
              and create a better future. Volunteer Hub is committed to being a driving force in 
              making this vision a reality.
            </p>
          </div>

          <div className="p-6 bg-green-100 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
            <p className="text-base md:text-lg leading-relaxed mb-6">
              Whether you're an individual looking to make a difference or an organization seeking volunteers, 
              Volunteer Hub is here to help. Together, we can make a lasting impact on the world.
            </p>
           <Link to={"/all-volunteer-need"}>
           <button className="btn btn-success bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold">
              Start Volunteering
            </button></Link>
          </div>
        </section>
      </div>
    </div>
  );
}
