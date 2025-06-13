import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content px-10 py-10">
      <div className="footer max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Logo */}
        <div>
          <span className="text-2xl font-bold">Logo</span>
        </div>

        {/* Quick Links */}
        <div>
          <span className="footer-title">Quick Links</span>
          <a className="link link-hover">About Us</a>
          <a className="link link-hover">Contact Us</a>
          <a className="link link-hover">Blog Posts</a>
          <a className="link link-hover">FAQs</a>
          <a className="link link-hover">Support</a>
        </div>

        {/* Resources */}
        <div>
          <span className="footer-title">Resources</span>
          <a className="link link-hover">E-books</a>
          <a className="link link-hover">Webinars</a>
          <a className="link link-hover">Case Studies</a>
          <a className="link link-hover">Testimonials</a>
          <a className="link link-hover">Careers</a>
        </div>

        {/* Stay Connected */}
        <div>
          <span className="footer-title">Stay Connected</span>
          <a className="link link-hover">Facebook</a>
          <a className="link link-hover">Twitter</a>
          <a className="link link-hover">LinkedIn</a>
          <a className="link link-hover">Instagram</a>
          <a className="link link-hover">YouTube</a>
        </div>

        {/* Subscribe */}
        <div>
          <span className="footer-title">Subscribe</span>
          <p className="text-sm">Join our newsletter for updates on features and releases.</p>
          <div className="form-control w-full mt-2">
            <label className="label">
              <span className="label-text sr-only">Email</span>
            </label>
            <div className="join">
              <input type="text" placeholder="Enter your email" className="input input-bordered join-item" />
              <button className="btn btn-primary join-item">Subscribe</button>
            </div>
            <p className="text-xs mt-1">
              By subscribing, you agree to our <a className="link link-hover underline">Privacy Policy</a> and consent to updates.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="border-t border-base-300 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>© 2024 Relume. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Terms of Service</a>
          <a className="link link-hover">Cookies Settings</a>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0 text-lg">
          <a><i className="fab fa-facebook"></i></a>
          <a><i className="fab fa-instagram"></i></a>
          <a><i className="fas fa-times"></i></a> {/* Placeholder icon for "X" (Twitter) */}
          <a><i className="fab fa-linkedin"></i></a>
          <a><i className="fab fa-youtube"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
