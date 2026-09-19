import { useEffect, useRef, useState } from "react";
import { getDoctors } from "../services/api";

export default function Profile() {
  const emergencyContactRef = useRef(null);

  const [message, setMessage] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [favouriteDoctors, setFavouriteDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  useEffect(() => {
    const loadDoctors = async () => {
      const response = await getDoctors();
      setDoctors(response.data);
    };

    loadDoctors();

    const savedFavourites =
      JSON.parse(localStorage.getItem("favouriteDoctors")) || [];

    setFavouriteDoctors(savedFavourites);
  }, []);

  const handleSave = () => {
    const emergencyContact = emergencyContactRef.current.value;

    const phoneRegex = /^01[0125][0-9]{8}$/;

    if (!emergencyContact) {
      setMessage("Please enter an emergency contact.");
      return;
    }

    if (!phoneRegex.test(emergencyContact)) {
      setMessage("Please enter a valid phone number.");
      return;
    }

    setMessage("Emergency contact saved successfully!");
  };

  const handleAddFavourite = () => {
    if (!selectedDoctor) {
      return;
    }

    const doctor = doctors.find(
      (doctor) => doctor.id === selectedDoctor
    );

    if (!doctor) {
      return;
    }

    const alreadyFavourite = favouriteDoctors.some(
      (favourite) => favourite.id === doctor.id
    );

    if (alreadyFavourite) {
      setSelectedDoctor("");
      return;
    }

    const updatedFavourites = [...favouriteDoctors, doctor];

    setFavouriteDoctors(updatedFavourites);

    localStorage.setItem(
      "favouriteDoctors",
      JSON.stringify(updatedFavourites)
    );

    setSelectedDoctor("");
  };

  const handleRemoveFavourite = (doctorId) => {
    const updatedFavourites = favouriteDoctors.filter(
      (doctor) => doctor.id !== doctorId
    );

    setFavouriteDoctors(updatedFavourites);

    localStorage.setItem(
      "favouriteDoctors",
      JSON.stringify(updatedFavourites)
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="max-w-3xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Patient Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your profile and favourite doctors.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

          <div className="bg-teal-600 p-6 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-white flex items-center justify-center">
              <span className="text-3xl font-bold text-teal-600">
                P
              </span>
            </div>

            <h2 className="text-xl font-semibold text-white mt-4">
              Patient
            </h2>

            <p className="text-teal-50 text-sm mt-1">
              Medical Booking Account
            </p>
          </div>

          <div className="p-6">

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-800">
                Emergency Contact
              </h3>

              <p className="text-sm text-gray-500 mt-1 mb-4">
                Add a contact number that can be reached in case of an
                emergency.
              </p>

              <input
                ref={emergencyContactRef}
                type="text"
                placeholder="Enter phone number"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />

              <button
                onClick={handleSave}
                className="mt-4 w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition-colors font-medium"
              >
                Save Contact
              </button>

              {message && (
                <p className="mt-4 text-center text-teal-600 font-medium">
                  {message}
                </p>
              )}
            </div>

            <div className="border-t border-gray-200 pt-8">

              <h3 className="text-lg font-semibold text-slate-800">
                Favourite Doctors
              </h3>

              <p className="text-sm text-gray-500 mt-1 mb-4">
                Choose doctors from your available doctors list and add them
                to your favourites.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">

                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">
                    Select a doctor
                  </option>

                  {doctors.map((doctor) => (
                    <option
                      key={doctor.id}
                      value={doctor.id}
                      disabled={favouriteDoctors.some(
                        (favourite) => favourite.id === doctor.id
                      )}
                    >
                      {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleAddFavourite}
                  className="bg-teal-600 text-white px-5 py-3 rounded-md hover:bg-teal-700 transition-colors font-medium"
                >
                  Add to Favourites
                </button>

              </div>

              <div className="mt-6 space-y-4">

                {favouriteDoctors.length === 0 ? (
                  <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500">
                      No favourite doctors yet.
                    </p>
                  </div>
                ) : (
                  favouriteDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="flex items-center justify-between gap-4 p-4 bg-slate-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-4">

                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-14 h-14 rounded-full object-cover bg-white"
                        />

                        <div>
                          <h4 className="font-semibold text-slate-800">
                            {doctor.name}
                          </h4>

                          <p className="text-sm text-teal-600">
                            {doctor.specialty}
                          </p>
                        </div>

                      </div>

                      <button
                        onClick={() => handleRemoveFavourite(doctor.id)}
                        className="text-sm text-red-500 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}