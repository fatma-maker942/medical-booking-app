import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AppointmentCard({
  appointment,
  onEdit,
  onCancel,
  onDelete,
}) {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg text-teal-700">
          {appointment.doctor}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-2 text-gray-600">
          <p>
            <span className="font-medium text-slate-700">Patient:</span>{" "}
            {appointment.patient}
          </p>

          <p>
            <span className="font-medium text-slate-700">Date:</span>{" "}
            {appointment.date}
          </p>

          <p>
            <span className="font-medium text-slate-700">Time:</span>{" "}
            {appointment.time}
          </p>

          <p>
            <span className="font-medium text-slate-700">Status:</span>{" "}
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                appointment.status === "Confirmed"
                  ? "bg-teal-50 text-teal-700"
                  : appointment.status === "Pending"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-rose-50 text-rose-700"
              }`}
            >
              {appointment.status}
            </span>
          </p>
        </div>

        <div className="flex gap-2 mt-5">
          <button
            onClick={() => onEdit(appointment)}
            className="flex-1 px-3 py-2 bg-teal-600 text-white rounded-md text-sm hover:bg-teal-700 transition-colors"
          >
            Edit
          </button>

          <button
            onClick={() => onCancel(appointment)}
            disabled={appointment.status === "Cancelled"}
            className="flex-1 px-3 py-2 bg-amber-500 text-white rounded-md text-sm hover:bg-amber-600 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={() => onDelete(appointment.id)}
            className="flex-1 px-3 py-2 bg-rose-600 text-white rounded-md text-sm hover:bg-rose-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </CardContent>
    </Card>
  );
}