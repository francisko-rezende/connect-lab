import { Devices, Home, Login, Profile, Registration } from "@pages";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

export const Router = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/cadastro" element={<Registration />} />

    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />
    <Route
      path="devices"
      element={
        <ProtectedRoute>
          <Devices />
        </ProtectedRoute>
      }
    />
    <Route
      path="perfil"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
  </Routes>
);
