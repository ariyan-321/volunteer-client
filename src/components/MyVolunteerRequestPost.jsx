import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../provider/AuthProvider";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2"; // Import SweetAlert2
import toast from "react-hot-toast"; // Optional, for additional success/error notifications
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function MyVolunteerRequestPost() {
  const {
    user,
    authenticate,
    loading: isAuthLoading,
  } = useContext(authContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email && !isAuthLoading) {
      axiosSecure
        .get(`/requests-email/${user?.email}`)
        .then((res) => {
          setRequests(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user?.email, authenticate]);

  const handleCancel = (requestId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This request will be permanently cancelled!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://assignment-11-new.vercel.app/requests/${requestId}`)
          .then((response) => {
            if (response.data.deletedCount > 0) {
              // Successfully deleted
              setRequests((prevRequests) =>
                prevRequests.filter((req) => req._id !== requestId)
              );
              Swal.fire({
                title: "Cancelled!",
                text: "Your request has been cancelled.",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: "There was an issue canceling your request.",
                icon: "error",
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: "An error occurred while canceling the request.",
              icon: "error",
            });
            console.log(err.message);
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="grid justify-items-center mt-12">
        <span className="loading loading-bars loading-lg text-4xl"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center font-bold text-4xl my-8 text-green-600">
        My Volunteer Request Posts
      </h1>

      {requests.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Deadline</th>
                <th className="px-6 py-3">Status</th>{" "}
                {/* Added Status Column */}
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {requests.map((request, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-center">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {request.title}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {request.category}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-center">
                    {new Date(request.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-center">
                    {/* Displaying the status */}
                    <span
                      className={`badge ${
                        request.status === "Cancelled"
                          ? "badge-error"
                          : "badge-success"
                      }`}
                    >
                      {request.status ?? "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-4">
                    <button
                      onClick={() => handleCancel(request._id)}
                      className="btn btn-sm btn-error text-white flex items-center gap-2"
                    >
                      <FaTrashAlt /> Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-8">
          No volunteer requests found.
        </p>
      )}
    </div>
  );
}
