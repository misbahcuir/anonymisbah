import React from "react";

const Footer = () => {
  return (
    <footer className="bg-amber-950/20 backdrop-blur-sm border-t border-amber-500/20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Developer Info */}
          <div className="text-center md:text-left">
            <p className="text-amber-500 text-sm font-medium">
              Developed by{" "}
              <span className="text-amber-400 font-semibold">
                Misbah Rumman
              </span>
            </p>
            <p className="text-amber-600/70 text-xs mt-1">
              Anonymous Quote Platform
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/misbahrumman/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors duration-300"
            >
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="text-sm font-medium">LinkedIn</span>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/misbah.rumman/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors duration-300"
            >
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-sm font-medium">Facebook</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-amber-500/10 text-center">
          <p className="text-amber-600/50 text-xs">
            © 2024 Anonymous Quote Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
