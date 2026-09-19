import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl sm:text-2xl font-bold text-teal-600">
          MedBook
        </div>

        <div className="flex gap-3 sm:gap-6">
          <Link
            to="/"
            className="text-sm sm:text-base text-gray-600 hover:text-teal-600 font-medium transition-colors">
            Doctors
          </Link>

          <Link
            to="/appointments"
            className="text-sm sm:text-base text-gray-600 hover:text-teal-600 font-medium transition-colors">
            Appointments
          </Link>

          <Link
            to="/profile"
            className="text-sm sm:text-base text-gray-600 hover:text-teal-600 font-medium transition-colors">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
