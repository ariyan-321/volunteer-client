import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function VolunteerNeedsNow() {
  const [volunteerNeeds, setVolunteerNeeds] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    axios
      .get('https://assignment-11-new.vercel.app/volunteer-needs') // Fetch volunteer needs from the backend
      .then((res) => {
        setVolunteerNeeds(res.data); // Set the data in the state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.error("Error fetching volunteer needs", err);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <h2 className="text-3xl font-semibold text-center mb-8 text-green-600">Volunteer Needs Now</h2>

      {/* Show loader when loading is true */}
      {loading ? (
        <div className="grid justify-items-center mt-12">
          <span className="loading loading-bars loading-lg text-4xl"></span>
        </div>
      ) : (
        // Show data when it's not loading
        <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 justify-self-center">
          {volunteerNeeds.length > 0 ? (
            volunteerNeeds.map((volunteerNeed, index) => (
              <div
                key={index}
                className="card w-full max-w-xs shadow-lg border-white border-2 rounded-lg  overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl "
              >
                <figure>
                  <img
                    src={volunteerNeed.thumbnail}
                    alt={volunteerNeed.title}
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{volunteerNeed.title}</h3>
                  <p className="text-sm mb-1">
                    <strong>Category:</strong> {volunteerNeed.category}
                  </p>
                  <p className="text-sm  mb-1">
                    <strong>Location:</strong> {volunteerNeed.location}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>Deadline:</strong> {new Date(volunteerNeed.postDeadline).toLocaleDateString()}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <Link
                      to={`/details/${volunteerNeed._id}`}
                      className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-primary-focus"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg mt-8">No volunteer needs available at the moment.</p>
          )}
        </div>
      )}

      {/* Button at the right bottom */}
      <Link to="/all-volunteer-need" className="btn absolute -bottom-9 right-44">
        All Volunteer Needs Post
      </Link>
    </div>
  );
}
