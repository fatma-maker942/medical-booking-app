import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../store/useStore";

export default function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctor = useStore((state) => state.selectedDoctor);
  const fetchDoctorById = useStore((state) => state.fetchDoctorById);
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);

  useEffect(() => {
    fetchDoctorById(id);
  }, [id, fetchDoctorById]);

  if (isLoading) {
    return (
      <div className="text-center text-teal-600 font-medium py-10">
        Loading doctor details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-medium py-10">
        {error}
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="text-center text-gray-500 font-medium py-10">
        Doctor not found.
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-teal-600 hover:text-teal-700 font-medium">
        ← Back to Doctors
      </button>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {doctor.image && (
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-40 h-40 rounded-full bg-slate-100 object-cover"/>
          )}

          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-teal-700 mb-2">
              {doctor.name}
            </h1>

            <p className="text-lg font-semibold text-gray-600 mb-4">
              {doctor.specialty}
            </p>

            <p className="text-gray-500">
              {doctor.experience}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            About the Doctor
          </h2>

          <p className="text-gray-600">
            {doctor.description}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            Available Working Days
          </h2>

          {doctor.workingDays && doctor.workingDays.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {doctor.workingDays.map((day) => (
                <span
                  key={day}
                  className="px-3 py-2 bg-teal-50 text-teal-700 rounded-md">
                  {day}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              Working days are not available.
            </p>
          )}
        </div>

        <button
          onClick={() => navigate(`/book-appointment?doctor=${doctor.id}`)}
          className="w-full mt-8 bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition-colors font-medium"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}