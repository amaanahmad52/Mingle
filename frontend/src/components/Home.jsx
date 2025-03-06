
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
const Home=()=>{
    const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center transition-all duration-500 ${darkMode ? "bg-gradient-to-r from-richblack-900 to-gray-900" : "bg-gradient-to-r from-gray-100 to-gray-300"}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center z-[-1] " style={{ backgroundImage: "url('https://thumbs.dreamstime.com/z/dynamic-mosaic-colorful-social-media-icons-dark-background-digital-marketing-insights-dynamic-mosaic-colorful-333029660.jpg?ct=jpeg')" }}></div>
      
      {/* Dark Mode Toggle */}
      <button
        className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-lg rounded-full shadow-lg hover:scale-110 transition"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-800" />}
      </button>
      
      {/* Glassy Container */}
      <div className="max-w-3xl p-10 text-center bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20 transition-all duration-500">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">Welcome to Mingle</h1>
        <p className="mt-4 text-lg text-gray-300 italic">"Connecting people, building relationships."</p>
        
        <div className="mt-6 flex gap-4">
          <Link to="/signup" className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg hover:scale-105 transition-all">Sign Up</Link>
<<<<<<< HEAD
          <Link to="/loginByEmail" className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl shadow-lg hover:scale-105 transition-all">Login</Link>
=======
          <Link to="/login" className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl shadow-lg hover:scale-105 transition-all">Login</Link>
>>>>>>> upstream/main
        </div>
      </div>
    </div>
  );
}

export default Home