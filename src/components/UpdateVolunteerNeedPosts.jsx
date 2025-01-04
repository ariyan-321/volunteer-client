import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { authContext } from '../provider/AuthProvider'; // Import authentication context
import useAxiosSecure from '../hooks/useAxiosSecure';

const UpdateVolunteerNeedPost = () => {
  const { id } = useParams(); // Extracting ID from route params
  const [volunteer, setVolunteer] = useState(null); // Initial state as null
  const [category, setCategory] = useState(''); // State for category
  const navigate = useNavigate();
  const { user } = useContext(authContext); // Access logged-in user's details
  const axiosSecure = useAxiosSecure();

  // Setting default values for the form
  const [startDate, setStartDate] = useState(new Date()); // Default start date

  useEffect(() => {
    document.title = 'Update Volunteer Need Post';
  }, []);

  useEffect(() => {
    axios.get(`https://assignment-11-new.vercel.app/volunteer/${id}`)
      .then(res => {
        setVolunteer(res.data);
        setCategory(res.data.category); // Set category from fetched data
        setStartDate(new Date(res.data.postDeadline)); // Set start date
      })
      .catch(err => {
        console.log(err);
        toast.error('Failed to load volunteer data');
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    // Extracting form data
    const title = form.title.value.trim();
    const thumbnail = form.thumbnail.value.trim();
    const location = form.location.value.trim();
    const noOfVolunteerNeed = parseInt(form.noOfVolunteers.value, 10);
    const description = form.description.value.trim();

    // Validating fields
    if (!title || !thumbnail || !category || !startDate || !location || !description) {
      toast.error('All fields are required!');
      return;
    }
    if (noOfVolunteerNeed <= 0) {
      toast.error("Number of Volunteers Needed must be greater than 0.");
      return;
    }

    // Convert the deadline to milliseconds
    const postDeadline = startDate.getTime(); // Convert Date object to timestamp

    // Constructing the updated volunteer data
    const updatedVolunteerData = {
      title,
      thumbnail,
      category,
      postDeadline, // Now in milliseconds
      location,
      noOfVolunteerNeed,
      description,
      OrganizerEmail: volunteer?.OrganizerEmail,
    };

    // Making the PUT request to update the data
    axiosSecure
      .put(`/update-volunteer/${id}`, updatedVolunteerData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success('Post updated successfully!');
          navigate('/manage-my-posts');
        } else {
          toast.error('Failed to update the post');
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('An error occurred while updating the post');
      });
  };

  // If volunteer data is not loaded yet, display loading state
  if (!volunteer) {
    return <div className='grid justify-items-center mt-12'>
    <span className="loading loading-bars loading-lg text-4xl"></span>
    </div>;
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className="p-2 md:p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 capitalize">Update Volunteer Need Post</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            {/* Post Title */}
            <div>
              <label className="text-gray-700" htmlFor="title">Post Title</label>
              <input
                id="title"
                name="title"
                defaultValue={volunteer?.title || ''}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label className="text-gray-700" htmlFor="thumbnail">Thumbnail</label>
              <input
                id="thumbnail"
                name="thumbnail"
                defaultValue={volunteer?.thumbnail || ''}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            {/* Deadline */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700">Deadline</label>
              <DatePicker
                className="border p-2 rounded-md"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700" htmlFor="category">Category</label>
              <select
                value={category} // Controlled component, value comes from state
                onChange={(e) => setCategory(e.target.value)} // Handle change
                name="category"
                id="category"
                className="border p-2 rounded-md"
              >
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="social_service">Social Service</option>
                <option value="animal_welfare">Animal Welfare</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="text-gray-700" htmlFor="location">Location</label>
              <input
                id="location"
                defaultValue={volunteer?.location || ''}
                name="location"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            {/* No. of Volunteers Needed */}
            <div>
              <label className="text-gray-700" htmlFor="noOfVolunteers">No. of Volunteers Needed</label>
              <input
                id="noOfVolunteers"
                defaultValue={volunteer?.noOfVolunteerNeed || 0}
                name="noOfVolunteers"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-gray-700" htmlFor="description">Description</label>
            <textarea
              defaultValue={volunteer?.description || ''}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
              name="description"
              id="description"
              cols="30"
              rows="4"
            ></textarea>
          </div>

          {/* Organizer Name (display only) */}
          <div className='py-4'>
            <label className="text-gray-700" htmlFor="organizerName">Organizer Name</label>
            <input
              id="organizerName"
              value={user?.displayName || ''}
              type="text"
              name="organizerName"
              disabled
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
            />
          </div>

          {/* Organizer Email (display only) */}
          <div className='py-4'>
            <label className="text-gray-700" htmlFor="organizerEmail">Organizer Email</label>
            <input
              id="organizerEmail"
              value={user?.email || ''}
              type="email"
              name="organizerEmail"
              disabled
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateVolunteerNeedPost;
