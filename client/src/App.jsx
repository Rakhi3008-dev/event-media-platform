import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import EventGallery from "./pages/EventGallery";
import CreateEvent from "./pages/CreateEvent";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import MyPhotos from "./pages/MyPhotos";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/event/:id" element={<EventGallery />} />
        <Route
          path="/create-event"
          element={
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route path="/my-photos" element={<MyPhotos />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
