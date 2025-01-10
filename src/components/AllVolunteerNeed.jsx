import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BsGrid, BsTable } from 'react-icons/bs';

export default function AllVolunteerNeed() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [noData, setNoData] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // State to toggle between grid and table view
  const [sortOrder, setSortOrder] = useState("ascending"); // State to track sorting order

  useEffect(() => {
    document.title = "All Volunteer Needs";
  });

  useEffect(() => {
    const fetchVolunteers = () => {
      setLoading(true);
      axios
        .get(`https://assignment-11-new.vercel.app/volunteer?search=${searchTerm}`)
        .then((res) => {
          if (res.data.length === 0) {
            setNoData(true);
          } else {
            setNoData(false);
          }
          const sortedData = sortVolunteers(res.data, sortOrder); // Apply sorting
          setVolunteers(sortedData);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false);
        });
    };

    if (searchTerm !== "" || searchTerm === "") {
      fetchVolunteers();
    }
  }, [searchTerm, sortOrder]); // Fetch data when search term or sort order changes

  // Function to sort volunteers
  const sortVolunteers = (data, order) => {
    return data.sort((a, b) => {
      const dateA = new Date(a.postDeadline);
      const dateB = new Date(b.postDeadline);
      return order === "ascending" ? dateA - dateB : dateB - dateA;
    });
  };

  return (
    <div className="py-10 container mx-auto px-5 lg:px-20">
      <h1 className="text-5xl font-bold text-center mb-10">All Volunteer Needs</h1>

      {/* Search Bar */}
      <div className="mb-8 flex flex-col sm:flex-row justify-center items-center gap-4">
        <input
          type="text"
          className="input input-bordered w-full sm:w-1/2 lg:w-1/3"
          placeholder="Search by title, category, or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-success w-full sm:w-auto font-semibold" onClick={() => setSearchTerm(searchTerm)}>
          Search
        </button>
      </div>

      {/* Sort Dropdown */}
      <div className="flex justify-center gap-4 mb-6">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-bordered font-semibold"
        >
          <option value="ascending">Sort by Date: Ascending</option>
          <option value="descending">Sort by Date: Descending</option>
        </select>
      </div>

      {/* Toggle View Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`btn ${viewMode === "grid" ? "btn-success" : "btn-outline"} flex items-center space-x-2`}
          onClick={() => setViewMode("grid")}
        >
          <BsGrid size={20} />
          <span>Grid</span>
        </button>
        <button
          className={`btn ${viewMode === "table" ? "btn-success" : "btn-outline"} flex items-center space-x-2`}
          onClick={() => setViewMode("table")}
        >
          <BsTable size={20} />
          <span>Table</span>
        </button>
      </div>

      {/* Show loading bar */}
      {loading ? (
        <div className="flex justify-center items-center mt-12">
          <span className="loading loading-bars loading-lg text-4xl"></span>
        </div>
      ) : (
        <>
          {noData ? (
            <div className="text-center text-xl font-semibold mt-12">
              No data available.
            </div>
          ) : (
            <>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {volunteers.map((volunteer) => (
                    <div
                      key={volunteer._id}
                      className="card shadow-md border-2 border-white rounded-lg p-4 hover:shadow-xl transform hover:scale-105 transition duration-300"
                    >
                      <img
                        src={volunteer.thumbnail}
                        alt={volunteer.title}
                        className="rounded-lg w-full h-48 object-cover"
                      />
                      <div className="card-body">
                        <h2 className="card-title font-bold text-2xl">{volunteer.title}</h2>
                        <p className="mt-2 text-sm">
                          <span className="font-semibold">Category:</span> {volunteer.category}
                        </p>
                        <p className="mt-1 text-sm">
                          <span className="font-semibold">Location:</span> {volunteer.location}
                        </p>
                        <p className="mt-1 text-sm">
                          <span className="font-semibold">Volunteers Needed:</span> {volunteer.noOfVolunteerNeed}
                        </p>
                        <p className="mt-1 text-sm">
                          <span className="font-semibold">Deadline:</span>{" "}
                          {new Date(volunteer.postDeadline).toLocaleDateString()}
                        </p>
                        <div className="card-actions justify-end mt-4">
                          <Link to={`/details/${volunteer._id}`} className="btn btn-outline font-semibold">
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table w-full rounded-lg shadow-md">
                    <thead className="">
                      <tr>
                        <th className="py-2 px-4 text-left">Thumbnail</th>
                        <th className="py-2 px-4 text-left">Title</th>
                        <th className="py-2 px-4 text-left">Category</th>
                        <th className="py-2 px-4 text-left">Location</th>
                        <th className="py-2 px-4 text-left">Volunteers Needed</th>
                        <th className="py-2 px-4 text-left">Deadline</th>
                        <th className="py-2 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {volunteers.map((volunteer) => (
                        <tr key={volunteer._id} className="">
                          <td className="py-2 px-4">
                            <img
                              src={volunteer.thumbnail}
                              alt={volunteer.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                          </td>
                          <td className="py-2 px-4">{volunteer.title}</td>
                          <td className="py-2 px-4">{volunteer.category}</td>
                          <td className="py-2 px-4">{volunteer.location}</td>
                          <td className="py-2 px-4">{volunteer.noOfVolunteerNeed}</td>
                          <td className="py-2 px-4">
                            {new Date(volunteer.postDeadline).toLocaleDateString()}
                          </td>
                          <td className="py-2 px-4">
                            <Link to={`/details/${volunteer._id}`} className="btn btn-outline btn-sm">
                              View Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
