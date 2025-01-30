import React from "react";
import { Link } from "react-router-dom";
import { Mail, Bell, ExternalLink } from "lucide-react";

const Navbar = () => {
    return (
        <div >
            {/* Left Section */}
            <div className="flex   space-x-4 bg-gray-800 text-white justify-between py-3 px-2">
                <div className="flex space-x-4 justify-start items-center ">
                    <img
                        src="https://res.cloudinary.com/dwwbx27ts/image/upload/v1738206603/Defence_Research_and_Development_Organisation_Logo_1_kpwb6v.jpg" // Replace with your logo URL
                        alt="Logo"
                        className="w-10 h-10 rounded-full "
                    />
                    <span className="text-xl font-semibold">PAOIP</span>
                </div>
                <div className="flex items-center justify-end space-x-4 ">
                    <Mail className="hover:text-gray-400 cursor-pointer" size={20} />
                    <Bell className="hover:text-gray-400 cursor-pointer" size={20} />
                </div>
            </div>

            {/* Middle Section (Navigation Links) */}
            <div className="flex space-x-6 items-center justify-center bg-gray-900 text-white  ">
                <Link
                    to="/"
                    className="relative inline-block hover:text-gray-400 hover:bg-gray-800 rounded-md p-5 pt-5 
             after:content-[''] after:absolute after:left-0 after:bottom-1 after:h-[4px] after:w-0 
             after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                >
                    OS Integrity CM Manager
                </Link>

                <Link to="/home" className="relative inline-block hover:text-gray-400 hover:bg-gray-800 rounded-md p-5 pt-5 
             after:content-[''] after:absolute after:left-0 after:bottom-1 after:h-[4px] after:w-0 
             after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                    Home
                </Link>
                <Link to="/analytics" className="relative inline-block hover:text-gray-400 hover:bg-gray-800 rounded-md p-5 pt-5 
             after:content-[''] after:absolute after:left-0 after:bottom-1 after:h-[4px] after:w-0 
             after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                    Analytics
                </Link>
                <Link to="/reports" className="relative inline-block hover:text-gray-400 hover:bg-gray-800 rounded-md p-5 pt-5 
             after:content-[''] after:absolute after:left-0 after:bottom-1 after:h-[4px] after:w-0 
             after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                    Reports
                </Link>
                <Link to="/configurations" className="relative inline-block hover:text-gray-400 hover:bg-gray-800 rounded-md p-5 pt-5 
             after:content-[''] after:absolute after:left-0 after:bottom-1 after:h-[4px] after:w-0 
             after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                    Configurations
                </Link>
                <Link to="/inferences" className="relative inline-block hover:text-gray-400 hover:bg-gray-800 rounded-md p-5 pt-5 
             after:content-[''] after:absolute after:left-0 after:bottom-1 after:h-[4px] after:w-0 
             after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                    Inferences
                </Link>
                <Link to="/device-management" className="relative inline-block hover:text-gray-400 hover:bg-gray-800 rounded-md p-5 pt-5 
             after:content-[''] after:absolute after:left-0 after:bottom-1 after:h-[4px] after:w-0 
             after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                    Device Management
                </Link>
                <Link
                    to="/dashboard"
                    className="relative  hover:text-gray-400 hover:bg-gray-800 rounded-md p-5 pt-5 
             after:content-[''] after:absolute after:left-0 after:bottom-1 after:h-[4px] after:w-0 
             after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full flex space-x-2"
                >
                    <ExternalLink size={16} />
                    <span>Go To Dashboard</span>
                </Link>
            </div>

            {/* Right Section (Icons) */}

        </div>
    );
};

export default Navbar;
