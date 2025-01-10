import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
   <div className='mt-[60vh] bg-gradient-to-br from-green-600 to-green-800 text-white  '>
     <footer className=" py-12 container mx-auto px-4">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Mission */}
        <aside className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              className="w-12 h-12 rounded-full"
              src="https://w7.pngwing.com/pngs/130/4/png-transparent-volunteering-united-nations-volunteers-community-computer-icons-organization-volunteer-thumbnail.png"
              alt="logo"
            />
            <h1 className="text-2xl font-bold tracking-wide">Volunteer Hub</h1>
          </div>
          <p className="text-sm leading-relaxed">
            Join hands to make a difference. Volunteer Hub connects passionate individuals to meaningful causes and inspires community-driven impact.
          </p>
        </aside>

        {/* Quick Links */}
        <nav>
          <h6 className="text-lg font-semibold mb-4">Quick Links</h6>
          <ul className="space-y-3">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/all-volunteer-need" className="hover:underline">All Volunteer Opportunities</Link></li>
            <li><Link to="/register" className="hover:underline">Register as Volunteer</Link></li>
            <li><Link to="/" className="hover:underline">About Us</Link></li>
          </ul>
        </nav>

        {/* Contact Us */}
        <nav>
          <h6 className="text-lg font-semibold mb-4">Contact Us</h6>
          <ul className="space-y-3">
            <li>Email: <a href="mailto:info@volunteerhub.com" className="hover:underline">info@volunteerhub.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="hover:underline">+1 234 567 890</a></li>
            <li>Address: 123 Volunteer Lane, Community City</li>
          </ul>
        </nav>

        {/* Follow Us */}
        <nav>
          <h6 className="text-lg font-semibold mb-4">Follow Us</h6>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transform transition duration-300"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="Facebook"
                className="w-8 h-8"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transform transition duration-300"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                alt="Twitter"
                className="w-8 h-8"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transform transition duration-300"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
                alt="Instagram"
                className="w-8 h-8"
              />
            </a>
          </div>
        </nav>
      </div>

      <div className="mt-10 text-center border-t border-green-500 pt-6">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Volunteer Hub. All rights reserved. Built with ❤️ for the community.
        </p>
      </div>
    </footer>
   </div>
  );
}
