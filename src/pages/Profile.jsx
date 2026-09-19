import { useRef, useState } from "react";

export default function Profile() {
  const emergencyContactRef = useRef(null);
  const [message, setMessage] = useState("");

  const handleSave = () => {
    const emergencyContact = emergencyContactRef.current.value;

    if (!emergencyContact) {
      setMessage("Please enter an emergency contact.");
      return;
    }

    setMessage("Emergency contact saved successfully!");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">
        Profile & Settings
      </h1>

      <p className="text-gray-500 mb-8">
        Manage your profile settings.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <label className="block font-medium text-gray-700 mb-2">
          Emergency Contact
        </label>

        <input
          ref={emergencyContactRef}
          type="text"
          placeholder="Enter emergency contact"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <button
          onClick={handleSave}
          className="mt-4 w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-colors font-medium"
        >
          Save
        </button>

        {message && (
          <p className="mt-4 text-teal-600 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}