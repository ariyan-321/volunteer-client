import React, { useState } from "react";
import axios from "axios";

export default function ContactUs() {
  // State variables for the form data and response
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle changes in form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage(""); // Reset the response message

    try {
      const response = await axios.post("https://mainsender2.vercel.app/send-mail", {
        to: formData.email,
        subject: "Message Received - Volunteer Hub",
        message: `Name: ${formData.name}\n\n${formData.message}`,
      });

      // Handle success
      setResponseMessage("Thank you for reaching out! We'll get back to you shortly.");
    } catch (error) {
      // Handle error
      setResponseMessage("Failed to send the message. Please try again later.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="contact-page min-h-screen bg-gradient-to-b from-green-700 to-green-900 text-white py-16 px-6">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-lg md:text-xl text-green-200">
          We’re here to help! Feel free to contact us with any questions or feedback about Volunteer Hub.
        </p>
      </div>

      {/* Contact Form Section */}
      <div className="form-section max-w-4xl mx-auto bg-green-800 p-8 rounded-lg shadow-2xl">
        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-green-300">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full mt-2 px-4 py-3 bg-green-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-green-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-3 bg-green-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-green-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here"
              className="w-full mt-2 px-4 py-3 bg-green-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-6 bg-gradient-to-r from-green-600 to-green-800 hover:opacity-90 rounded-lg font-semibold text-white transition duration-300 transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Response message */}
        {responseMessage && (
          <div className="mt-6 text-center text-lg text-green-200">
            {responseMessage}
          </div>
        )}
      </div>

      {/* Contact Information Section */}
      <div className="contact-info mt-24 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
        <p className="text-lg text-green-200 mb-8">
          You can also reach us through the following ways:
        </p>
        <div className="info grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
          <div>
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <p className="text-green-200">support@volunteerhub.com</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Phone</h3>
            <p className="text-green-200">+880 123 456 7890</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Address</h3>
            <p className="text-green-200">Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>
    </div>
  );
}
