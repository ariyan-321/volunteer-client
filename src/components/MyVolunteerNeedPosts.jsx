import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../provider/AuthProvider";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
export default function MyVolunteerNeedPosts() {
  const {
    user,
    authenticate,
    loading: isAuthLoading,
  } = useContext(authContext);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email && !isAuthLoading) {
      axiosSecure
        .get(`/volunteer-email/${user?.email}`)
        .then((res) => {
          console.log(res.data);
          setVolunteers(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user?.email, authenticate]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://assignment-11-new.vercel.app/volunteer/${id}`)
          .then((response) => {
            if (response.data.deletedCount > 0) {
              // Successfully deleted
              setVolunteers((prev) =>
                prev.filter((volunteer) => volunteer._id !== id)
              ); // Remove deleted post from state
              Swal.fire({
                title: "Deleted!",
                text: "Your post has been deleted.",
                icon: "success",
              });
            } else {
              // If no documents were deleted
              Swal.fire({
                title: "Error!",
                text: "There was an issue deleting your post.",
                icon: "error",
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: "An error occurred while deleting the post.",
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
        My Volunteer Need Posts
      </h1>

      {volunteers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">No. of Volunteers Needed</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {volunteers.map((volunteer, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-center">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {volunteer.title}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {volunteer.description}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-center">
                    {volunteer.noOfVolunteerNeed ?? "Not Specified"}
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-4">
                    <Link
                      to={`/update-volunteer-need-post/${volunteer._id}`}
                      className="btn btn-sm btn-success text-white flex items-center gap-2"
                    >
                      <FaEdit /> Update
                    </Link>
                    <button
                      onClick={() => handleDelete(volunteer._id)}
                      className="btn btn-sm btn-error text-white flex items-center gap-2"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-8">
          No volunteer posts found.
        </p>
      )}
    </div>
  );
}
