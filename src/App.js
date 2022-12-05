import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Landing from "./components/Landing";
import Register from "./components/Register";
import Error from "./components/Error";
import SharedLayout from "./components/dashboard/SharedLayout";
import Stats from "./components/dashboard/Stats";
import AllJobs from "./components/dashboard/AllJobs";
import AddJob from "./components/dashboard/AddJob";
import Profile from "./components/dashboard/Profile";

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </main>
  );
}
