import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/doctors/${doctor.id}`)}
      className="hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-teal-500 cursor-pointer">
      <CardHeader className="flex flex-row items-center gap-4">
        {doctor.image && (
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-14 h-14 rounded-full bg-slate-100 object-cover"/>
        )}

        <div>
          <CardTitle className="text-xl text-teal-700">
            {doctor.name}
          </CardTitle>

          <CardDescription className="text-md font-semibold text-gray-600">
            {doctor.specialty}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-gray-500 mb-4">
          {doctor.experience}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/book-appointment?doctor=${doctor.id}`);
          }}
          className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-colors font-medium">
          Book Appointment
        </button>
      </CardContent>
    </Card>
  );
}