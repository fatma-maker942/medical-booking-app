import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import useStore from "../store/useStore";

export default function BookAppointment() {
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("doctor");
  const navigate = useNavigate();

  const doctorsList = useStore((state) => state.doctorsList);
  const fetchDoctors = useStore((state) => state.fetchDoctors);
  const addAppointment = useStore((state) => state.addAppointment);
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);
  const successMessage = useStore((state) => state.successMessage);

  const selectedDoctor = doctorsList.find(
    (doctor) => doctor.id === doctorId
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (doctorsList.length === 0) {
      fetchDoctors();
    }
  }, [doctorsList.length, fetchDoctors]);

  const today = new Date().toISOString().split("T")[0];

  const onSubmit = async (data) => {
    if (!selectedDoctor) {
      return;
    }

    const success = await addAppointment({
      patient: data.patient,
      email: data.email,
      phone: data.phone,
      doctor: selectedDoctor.name,
      doctorId: selectedDoctor.id,
      date: data.date,
      time: data.time,
      note: data.note,
    });

    if (success) {
      setTimeout(() => {
        navigate("/appointments");
      }, 1000);
    }
  };

  if (!selectedDoctor && !isLoading) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center">
        <p className="text-gray-500 mb-4">
          Doctor not found.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
        >
          Back to Doctors
        </button>
      </div>
    );
  }

  if (!selectedDoctor) {
    return (
      <div className="text-center text-teal-600 font-medium py-10">
        Loading doctor details...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">
        Book Appointment
      </h1>

      <p className="text-gray-500 mb-8">
        Book an appointment with {selectedDoctor.name}
      </p>

      {error && (
        <div className="mb-5 p-3 rounded-md bg-red-50 text-red-600 border border-red-200">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-5 p-3 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
          {successMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-5"
      >
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Patient Name
          </label>

          <input
            {...register("patient", {
              required: "Patient name is required",
              validate: (value) =>
                value.trim() !== "" || "Patient name cannot be empty",
            })}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your name"
          />

          {errors.patient && (
            <p className="text-red-500 text-sm mt-1">
              {errors.patient.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Email
          </label>

          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email",
              },
            })}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your email"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Phone
          </label>

          <input
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{11}$/,
                message: "Phone number must be exactly 11 digits",
              },
            })}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your phone number"
          />

          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Doctor
          </label>

          <input
            value={`${selectedDoctor.name} - ${selectedDoctor.specialty}`}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Date
          </label>

          <input
            type="date"
            min={today}
            {...register("date", {
              required: "Date is required",
              validate: (value) =>
                value >= today || "Date cannot be in the past",
            })}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          {errors.date && (
            <p className="text-red-500 text-sm mt-1">
              {errors.date.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Time
          </label>

          <input
            type="time"
            {...register("time", {
              required: "Time is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          {errors.time && (
            <p className="text-red-500 text-sm mt-1">
              {errors.time.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Note
          </label>

          <textarea
            {...register("note")}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Optional note"
            rows="4"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition-colors font-medium disabled:opacity-50"
        >
          {isLoading ? "Booking..." : "Confirm Appointment"}
        </button>
      </form>
    </div>
  );
}