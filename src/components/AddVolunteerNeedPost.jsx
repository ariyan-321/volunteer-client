import React, { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';
import { authContext } from '../provider/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';

export default function AddVolunteerNeedPost() {
  const [deadline, setDeadline] = useState(new Date());

  const { user } = useContext(authContext);

  const axiosSecure=useAxiosSecure()

  useEffect(() => {
    document.title = 'Add Volunteer Need Post';
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const thumbnail = form.thumbnail.value;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    const location = form.location.value;
    const noOfVolunteerNeed = parseInt(form.number.value, 10); // Ensure integer
    const postDeadline = parseInt(deadline.getTime(), 10); // Convert to integer
    const OraganizerName = user?.displayName;
    const OrganizerEmail = user?.email;

    if (noOfVolunteerNeed <= 0) {
      toast.error("Number of Volunteers Needed must be greater than 0.");
      return; 
    }

    const postData = {
      thumbnail,
      title,
      description,
      category,
      location,
      noOfVolunteerNeed,
      postDeadline,
      OraganizerName,
      OrganizerEmail,
    };

    axiosSecure
      .post('/add-volunteer', postData)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          toast.success('Successfully added data');
          form.reset();
          navigate('/manage-my-posts');
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-white shadow-2xl rounded-lg mt-7">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-700">Add Volunteer Need Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Thumbnail */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Thumbnail URL</span>
          </label>
          <input
            name="thumbnail"
            type="text"
            placeholder="Enter thumbnail URL"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Post Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Post Title</span>
          </label>
          <input
            name="title"
            type="text"
            placeholder="Enter post title"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Description</span>
          </label>
          <textarea
            name="description"
            placeholder="Enter description"
            rows="4"
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Category</span>
          </label>
          <select name="category" className="select select-bordered w-full" required>
            <option value="">Select a category</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="social_service">Social Service</option>
            <option value="animal_welfare">Animal Welfare</option>
          </select>
        </div>

        {/* Location */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Location</span>
          </label>
          <input
            name="location"
            type="text"
            placeholder="Enter location"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Number of Volunteers Needed */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">No. of Volunteers Needed</span>
          </label>
          <input
            name="number"
            type="number"
            placeholder="Enter number"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Deadline */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Deadline</span>
          </label>
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            className="input input-bordered w-full"
            dateFormat="yyyy-MM-dd"
            required
          />
        </div>

        {/* Organizer Info */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Organizer Name</span>
          </label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Organizer Email</span>
          </label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Add Post Button */}
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary w-full text-lg font-bold">
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
}
