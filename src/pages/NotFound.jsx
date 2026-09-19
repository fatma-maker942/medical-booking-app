import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-6xl font-bold text-teal-600 mb-4">
        404
      </h1>

      <h2 className="text-2xl font-bold text-slate-800 mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-500 mb-6">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="bg-teal-600 text-white px-5 py-2 rounded-md hover:bg-teal-700 transition-colors"
      >
        Back to Doctors
      </Link>
    </div>
  );
}