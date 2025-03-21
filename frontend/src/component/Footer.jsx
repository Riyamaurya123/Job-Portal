import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold">Your Company</h2>
          <p className="text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
        
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-black hover:text-[#6A38C2]"><FaFacebook size={20} /></a>
          <a href="#" className="text-black hover:text-[#6A38C2]"><FaTwitter size={20} /></a>
          <a href="#" className="text-black hover:text-[#6A38C2]"><FaLinkedin size={20} /></a>
          <a href="#" className="text-black hover:text-[#6A38C2]"><FaInstagram size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
