import React, { useContext, useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { authContext } from "../provider/AuthProvider";
import { format } from "date-fns"; // Import format from date-fns
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function VolunteerNeedPostDetails() {
  const { user } = useContext(authContext); // Access logged-in user data
  const volunteerData = useLoaderData(); // Fetch volunteer data from the database

  const axiosSecure=useAxiosSecure();

  useEffect(()=>{
    document.title="VolunteerNeedPostDetails"
  })

  const [volunteer, setVolunteer] = useState(volunteerData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [volunteerUpdated, setVolunteerUpdated] = useState(false); // New state for update flag

  // Effect hook to re-fetch data if the volunteer details are updated
  useEffect(() => {
    if (volunteerUpdated) {
      axios.get(`https://assignment-11-new.vercel.app/volunteer/${volunteer?._id}`)
        .then(res => {
          setVolunteer(res.data); // Update volunteer data after successful request
          setVolunteerUpdated(false); // Reset the flag
        })
        .catch(err => {
          toast.error("Failed to load updated volunteer data");
        });
    }
  }, [volunteerUpdated, volunteer?._id]);

  const handleRequest = () => {


    if (!suggestion.trim()) {
      return toast.error("Suggestion field cannot be empty!");
    }

   

    const requestData = {
      jobId: volunteer?._id,
      thumbnail: volunteer?.thumbnail,
      title: volunteer?.description,
      category: volunteer?.category,
      location: volunteer?.location,
      numOfVolunteers: volunteer?.noOfVolunteerNeed,
      deadline: volunteer?.postDeadline,
      organizerName: volunteer?.OraganizerName,
      organizerEmail: volunteer?.OrganizerEmail,
      volunteerName: user?.displayName,
      volunteerEmail: user?.email,
      suggestion,
      status: "requested", // Default status
    };


    axiosSecure.post("/add-requests", requestData)
      .then(res => {
        if (res.data.insertedId) {
          toast.success("Successfully sent request");
          setSuggestion("");
          setIsModalOpen(false);
          setVolunteerUpdated(true); // Set the flag to trigger re-fetch
        }
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  if (!volunteer) {
    return (
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          Loading Volunteer Post Details...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
          Volunteer Opportunity
        </h2>
        <p className="text-lg text-gray-600">
          Make a difference by joining this initiative!
        </p>
      </div>

      {/* Thumbnail and Details Section */}
      <div className="flex flex-col md:flex-row gap-12 mb-10">
        {/* Left: Thumbnail */}
        <div className="flex-shrink-0 md:w-1/3">
          <img
            src={volunteer?.thumbnail || "https://via.placeholder.com/800x400"}
            alt="Post Thumbnail"
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Right: Details */}
        <div className="md:w-2/3 space-y-6">
          <div className="text-lg font-semibold text-gray-900">
            <p>
              <strong>Post Title:</strong> {volunteer?.description || "N/A"}
            </p>
          </div>
          <div className="text-lg font-semibold text-gray-900">
            <p>
              <strong>Category:</strong> {volunteer?.category || "N/A"}
            </p>
          </div>
          <div className="text-lg font-semibold text-gray-900">
            <p>
              <strong>Desciption:</strong> {volunteer?.description || "N/A"}
            </p>
          </div>
          <div className="text-lg font-semibold text-gray-900">
            <p>
              <strong>Location:</strong> {volunteer?.location || "N/A"}
            </p>
          </div>
          <div className="text-lg font-semibold text-gray-900">
            <p>
              <strong>No. of Volunteers Needed:</strong> {volunteer?.noOfVolunteerNeed} <span className="text-red-500">{(volunteer?.noOfVolunteerNeed<=0 && "No More Volunteer Needed")}</span>
            </p>
          </div>
          <div className="text-lg font-semibold text-gray-900">
            <p>
              <strong>Deadline:</strong> {format(new Date(volunteer?.postDeadline), "P")}
            </p>
          </div>
          <div className="text-lg font-semibold text-gray-900">
            <p>
              <strong>Organizer Name:</strong> {volunteer?.OraganizerName || "N/A"}
            </p>
          </div>
          <div className="text-lg font-semibold text-gray-900">
            <p>
              <strong>Organizer Email:</strong> {volunteer?.OrganizerEmail || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="text-center">
        <button
          className="btn bg-blue-700 text-white px-8 py-3 text-lg font-bold rounded-full hover:bg-blue-800 focus:outline-none"
          onClick={() => {
            if(volunteer?.noOfVolunteerNeed<=0){
              return toast.error("No More Volunteer Needed")
            }
            if(user?.email===volunteer?.OrganizerEmail){
              return toast.error("You Can't Be A Volunteer On Your Own Post");
            }
            setIsModalOpen(true)
          }}
        >
          Be a Volunteer
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative bg-white p-8 rounded-lg shadow-xl">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2 text-gray-600"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <h3 className="font-bold text-xl text-gray-900 mb-6">
              Volunteer Application
            </h3>
            <div className="space-y-6">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Thumbnail</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={volunteer?.thumbnail || ""}
                  readOnly
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Post Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={volunteer?.title || ""}
                  readOnly
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold"> Description</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={volunteer?.description || ""}
                  readOnly
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Category</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={volunteer?.category || ""}
                  readOnly
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Location</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={volunteer?.location || ""}
                  readOnly
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">No. of Volunteers Needed</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={volunteer?.noOfVolunteerNeed || ""}
                  readOnly
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Deadline</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={format(new Date(volunteer?.postDeadline), "P")}
                  readOnly
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Organizer Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={volunteer?.OraganizerName || ""}
                  readOnly
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Organizer Email</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={volunteer?.OrganizerEmail || ""}
                  readOnly
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Volunteer Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={user?.displayName || ""}
                  readOnly
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Volunteer Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  value={user?.email || ""}
                  readOnly
                />
              </div>

              {/* Suggestion Field */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Your Suggestion</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Enter your suggestions here..."
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                className="btn bg-blue-700 text-white w-full mt-4 rounded-full hover:bg-blue-800 focus:outline-none"
                onClick={handleRequest}
              >
                Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
