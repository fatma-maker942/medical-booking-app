Medical Booking App

A responsive medical booking application built with React that allows users to browse doctors, view doctor details, book appointments, and manage their appointments.

Features
View available doctors
Search doctors by name or specialty
Filter doctors by specialty
View detailed doctor information
Book medical appointments
Validate booking form fields
View all appointments
Edit and reschedule appointments
Cancel appointments
Delete appointments with confirmation
Profile settings with an uncontrolled input using useRef
Loading, error, empty, and success states
Responsive design for desktop and mobile
404 Not Found page
Technologies
React
React Router
Axios
Zustand
React Hook Form
Tailwind CSS
shadcn/ui
JSON Server
Vite
Project Structure
src/
├── components/
│   ├── Navbar.jsx
│   ├── DoctorCard.jsx
│   └── AppointmentCard.jsx
│
├── pages/
│   ├── Doctors.jsx
│   ├── DoctorDetails.jsx
│   ├── BookAppointment.jsx
│   ├── Appointments.jsx
│   ├── Profile.jsx
│   └── NotFound.jsx
│
├── services/
│   └── api.js
│
├── store/
│   └── useStore.js
│
├── App.jsx
└── main.jsx
Installation

Clone the repository:

git clone YOUR_GITHUB_REPOSITORY_URL

Navigate to the project folder:

cd medical-booking-app

Install dependencies:

npm install
Running the Project

Start the JSON Server:

npm run server

Start the React development server in another terminal:

npm run dev
Available Scripts
npm run dev

Starts the React development server.

npm run server

Starts JSON Server using db.json.

npm run build

Creates a production build.

npm run lint

Checks the project code for linting issues.

npm run preview

Previews the production build locally.

API

The application uses JSON Server as a local REST API.

Main endpoints:

GET    /doctors
GET    /doctors/:id

GET    /appointments
POST   /appointments
PUT    /appointments/:id
DELETE /appointments/:id
Screenshots

Screenshots of the application can be added here after uploading them to the repository.

Deployment

Deployment link will be added here after deploying the application.

Author

Fatma Ahmed